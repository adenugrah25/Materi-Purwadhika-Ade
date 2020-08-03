// import database
const CryptoJS = require("crypto-js");
const { validationResult } = require("express-validator");
// const nodemailer = require('nodemailer')
const database = require("../database");
const { generateQuery, asyncQuery } = require("../helpers/queryHelp");
const util = require("util");
// const asyncQuery = util.promisify(database.query).bind(database);
const { createToken } = require("../helpers/jwt");
const { info } = require("console");
const transporter = require("../helpers/nodemailer");

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_GMAIL = process.env.TOKEN_GMAIL;

// //setup nodemailer
// //transporter adalah fungsi yg mengirim email
// const transporter = nodemailer.createTransport({
//   service : 'gmail',
//   auth : {
//     user : 'notyourlocaldrive@gmail.com',
//     pass : TOKEN_GMAIL
//   },
//   tls : {
//     rejectUnauthorized : true
//   }
// })

module.exports = {
  getUserData: async (req, res) => {
    const getData = "SELECT * FROM users";
    try {
      const resultDataUser = await asyncQuery(getData);
      // console.log(result)
      res.status(200).send(resultDataUser);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const getDataUsername = `SELECT * FROM users WHERE username = '${username}'`;
      const resultUname = await asyncQuery(getDataUsername);

      if (resultUname.length === 0) {
        return res.status(400).send(`Username not found`);
      }

      //check password : password form user vs password form database
      const hashpass = CryptoJS.HmacMD5(password, SECRET_KEY);
      if (hashpass.toString() !== resultUname[0].password) {
        return res.status(400).send("invalid password.");
      }

      // filter data
      delete resultUname[0].password;

      // create user token
      const token = createToken({
        id: resultUname[0].user_id,
        username: resultUname[0].username,
      });
      console.log("token : ", token);

      // include token in result
      resultUname[0].token = token;

      res.status(200).send(resultUname[0]);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  register: async (req, res) => {
    console.log("body : ", req.body);
    console.log(`TOKEN GMAIL :`, TOKEN_GMAIL)
    const { username, email, password, confpassword } = req.body;
    try {
      // validate user input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array()[0].msg });
      }

      // check password
      if (password !== confpassword) {
        return res.status(400).send("password doesn't match.");
      }

      // insert new user to database
      const checkUser = `SELECT * FROM users WHERE username='${username}' OR email='${email}'`;
      const hasil = await asyncQuery(checkUser);

      // check result
      if (hasil.length > 0) {
        return res.status(400).send("Username or Email is already used.");
      }

      // encypt password before insert into database
      const hashpass = CryptoJS.HmacMD5(password, SECRET_KEY);
      const insertUser = `INSERT INTO users (username, password, email, role, status)
                          values ('${username}', '${hashpass.toString()}', '${email}', 'user', 0)`;
      const resultQuery = await asyncQuery(insertUser);

      const new_userId = resultQuery.insertId;
      // insert new profile to database
      const insertProfile = `INSERT INTO profile (user_id) values (${new_userId})`;
      const newProfile = await asyncQuery(insertProfile);
      // res.status(200).send(resultQuery2nd);

      //create token
      const token = createToken({ id: new_userId, username: username });
      
      // send email verification to user
      const option = {
        from: `admin <notyourlocaldrive@gmail.com>`,
        to: `zoomade25@gmail.com`,
        subject: `Email Verification`,
        text: "",
        html: `<h3>Click link below to verified your account</h3>
        <a href="http://localhost:3000/verification?${token}">http://localhost:3000/verification?${token}</a>`,
      };

      // transporter.sendMail(option, (info) => {
      //   res.status(200).send(info.response);
      // })

      const info = await transporter.sendMail(option);
      res.status(200).send(info.response);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    const { password } = req.body;
    try {
      // check if user with id is exist in our database
      const checkId = `SELECT * FROM users WHERE user_id=${id}`;
      const resultCheckID = await asyncQuery(checkId);

      //check result
      if (resultCheckID.length === 0) {
        return res.status(200).send(`user with id : ${id} doens't exists.`);
      }

      // check password
      const hashpass = CryptoJS.HmacMD5(password, SECRET_KEY);
      if (hashpass.toString() !== resultCheckID[0].password) {
        return res.status(400).send("invalid password.");
      }

      // if user exist in our database
      const delAccount = `DELETE FROM users WHERE user_id=${id}`;
      const resultDelAcc = await asyncQuery(delAccount);

      // send result to user
      res.status(200).send(resultDelAcc);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  //   delete: (req, res) => {
  //     console.log("params : ", req.params);
  //     console.log("body : ", req.body);
  //     const id = parseInt(req.params.id);
  //     const { password } = req.body;

  //     // check if user with id is exist in our database
  //     const checkId = `SELECT * FROM users WHERE user_id=${id}`;
  //     database.query(checkId, (err, result) => {
  //       if (err) {
  //         return res.status(500).send(err);
  //       }

  //       // check result
  //       if (result.length === 0) {
  //         return res.status(200).send(`user with id : ${id} doens't exists.`);
  //       }

  //       // check password
  //       const hashpass = CryptoJS.HmacMD5(password, secretKey);
  //       if (hashpass.toString() !== result[0].password) {
  //         return res.status(400).send("invalid password.");
  //       }

  //       // if user exist in our database
  //       const delAccount = `DELETE FROM users WHERE user_id=${id}`;
  //       database.query(delAccount, (err2, result2) => {
  //         if (err2) {
  //           return res.status(500).send(err2);
  //         }

  //         // const delProfile = `DELETE FROM profile WHERE user_id=${id}`
  //         // database.query(delProfile, (err3, result3) => {
  //         //     if (err3) {
  //         //         return res.status(500).send(err3)

  //         //     }
  //         // })
  //         // send result to user
  //         res.status(200).send(result2);
  //       });
  //     });
  //   },
  edit: async (req, res) => {
    console.log("params : ", req.params);
    console.log("body : ", req.body);
    const id = parseInt(req.params.id);
    try {
      // check user with id
      const checkIdUser = `SELECT * FROM users WHERE user_id=${id}`;
      const resultCheckIdUser = await asyncQuery(checkIdUser);

      // check result
      if (resultCheckIdUser.length === 0) {
        return res.status(200).send(`user with id : ${id} doens't exists.`);
      }

      // edit data user di database
      const editQuery = `UPDATE users SET ${generateQuery(
        req.body
      )} WHERE user_id=${id}`;
      console.log(editQuery);
      const resultEditQuery = await asyncQuery(editQuery);

      // send response to user
      res.status(200).send(resultEditQuery);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  //   edit: (req, res) => {
  //     console.log("params : ", req.params);
  //     console.log("body : ", req.body);
  //     const id = parseInt(req.params.id);

  //     // check user with id
  //     const checkId = `SELECT * FROM users WHERE user_id=${id}`;
  //     database.query(checkId, (err, result) => {
  //       if (err) {
  //         return res.status(500).send(err);
  //       }

  //       // check result
  //       if (result.length === 0) {
  //         return res.status(200).send(`user with id : ${id} doens't exists.`);
  //       }

  //       // edit data user di database
  //       const editQuery = `UPDATE users SET ${generateQuery(
  //         req.body
  //       )} WHERE user_id=${id}`;
  //       console.log(editQuery);

  //       database.query(editQuery, (err2, result2) => {
  //         if (err2) {
  //           return res.status(500).send(err2);
  //         }

  //         // sent response to user
  //         res.status(200).send(result2);
  //       });
  //     });
  //   },
  editPass: async (req, res) => {
    console.log("params : ", req.params);
    console.log("body : ", req.body);
    const id = parseInt(req.params.id);
    const { oldpass, newpass, confpass } = req.body;

    try {
      //check the similiarity password
      if (newpass !== confpass) {
        return res.status(400).send("password doesn't match.");
      }

      // check new password requirement
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
      }

      // check password
      const checkPass = `SELECT password FROM users WHERE user_id=${id}`;
      const resultCheckPass = await asyncQuery(checkPass);

      const hasholdpass = CryptoJS.HmacMD5(oldpass, SECRET_KEY);
      if (hasholdpass.toString() !== resultCheckPass[0].password) {
        return res.status(400).send("invalid password.");
      }

      // update password
      const hashpass = CryptoJS.HmacMD5(newpass, SECRET_KEY);
      const updatePass = `UPDATE users SET password='${hashpass}' WHERE user_id=${id}`;
      const resultUpdatePass = await asyncQuery(updatePass);
      // send response to user
      res.status(200).send(resultUpdatePass);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  keeplogin: async (req, res) => {
    console.log("user : ", req.user);
    try {
      // query to get user's data
      const queryKeepLogin  = `SELECT user_id, username, email, role FROM users 
                              WHERE user_id=${req.user.id} AND username='${req.user.username}'`;
      const resultKeepLogin = await asyncQuery(queryKeepLogin);
      console.log("resultkeeplogin : ", resultKeepLogin);

      res.status(200).send(resultKeepLogin[0]);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  emailverification: async (req, res) => {
    console.log("user : ", req.user);
    try {
      // change status user in database
      const queryUpdateStatusUser = `UPDATE users SET status = 1 WHERE user_id = ${req.user.id} AND username = '${req.user.username}'`;
      const resultVerif = await asyncQuery(queryUpdateStatusUser);
      console.log('result verification : ', resultVerif);

      res.status(200).send("Email has been verified.");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  //   editPass: (req, res) => {
  //     console.log("params : ", req.params);
  //     console.log("body : ", req.body);
  //     const id = parseInt(req.params.id);
  //     const { oldpass, newpass, confpass } = req.body;

  //     if (newpass !== confpass) {
  //       return res.status(400).send("password doesn't match.");
  //     }

  //     // check new password requirement
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return res.status(422).send({ errors: errors.array() });
  //     }

  //     // check password
  //     const checkPass = `SELECT password FROM users WHERE user_id=${id}`;
  //     database.query(checkPass, (err, result) => {
  //       if (err) {
  //         return res.status(500).send(err);
  //       }

  //       const hasholdpass = CryptoJS.HmacMD5(oldpass, secretKey);
  //       if (hasholdpass.toString() !== result[0].password) {
  //         return res.status(400).send("invalid password.");
  //       }

  //       // update password
  //       const hashpass = CryptoJS.HmacMD5(newpass, secretKey);
  //       const updatePass = `UPDATE users SET password='${hashpass}' WHERE user_id=${id}`;
  //       database.query(updatePass, (err2, result2) => {
  //         if (err2) {
  //           res.status(500).send(err2);
  //         }

  //         res.status(200).send(result2);
  //       });
  //     });
  //   },
};

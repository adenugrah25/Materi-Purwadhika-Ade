const jwt = require('jsonwebtoken')
const TOKEN_KEY = process.env.TOKEN_KEY

module.exports = {
    createToken : (data) => {
        return jwt.sign(data, TOKEN_KEY, {expiresIn : '1hr'})
    },

    //verify token as middleware
    verify : (req, res, next) => {
        const token = req.body.token

        try {
            //verify token
            const result = jwt.verify(token, TOKEN_KEY)

            //add token data to request
            req.user = result

            //next : dipakai untuk middleware
            next()
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}
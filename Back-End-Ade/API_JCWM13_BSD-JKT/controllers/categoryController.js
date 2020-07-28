const database = require("../database");
const { generateQuery } = require("../helpers/queryHelp");
const util = require("util");
const asyncQuery = util.promisify(database.query).bind(database);

module.exports = {
  // getCategory : (req, res) => {
  //     const query = `SELECT * FROM categories`
  //     database.query(query, (err, result) => {
  //         if (err) {
  //             return res.status(500).send(err)
  //         }

  //         res.status(200).send(result)
  //     })
  // },
  getCategory: async (req, res) => {
    const getDataCategory = `SELECT * FROM categories`;
    try {
      const resultCat = await asyncQuery(getDataCategory);
      res.status(200).send(resultCat);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  addCategory: async (req, res) => {
    console.log("body : ", req.body);
    const { category, parentId } = req.body;
    try {
      const queryAddCat = `INSERT INTO categories (category, parent_id) values (${database.escape(
        category
      )}, ${database.escape(parentId)})`;
      const resultAddCat = await asyncQuery(queryAddCat);
      res.status(200).send(resultAddCat);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // addCategory : (req, res) => {
  //     console.log('body : ', req.body)
  //     const { category, parentId } = req.body

  //     const query = `INSERT INTO categories (category, parent_id) values (${database.escape(category)}, ${database.escape(parentId)})`
  //     database.query(query, (err, result) => {
  //         if (err) {
  //             return res.status(500).send(err)
  //         }

  //         res.status(200).send(result)
  //     })
  // },
  getCategoryDetails: async (req, res) => {
    const queryCatDets = `SELECT c2.id, c2.category, c1.category as parent 
                    FROM categories c1
                    RIGHT JOIN categories c2
                    ON c1.id = c2.parent_id`;
    try {
      const resultCatDets = await asyncQuery(queryCatDets);
      res.status(200).send(resultCatDets);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // getCategoryDetails : (req, res) => {
  //     const query = `SELECT c1.id, c1.category, c2.category as category_child
  //                 FROM categories c1
  //                 JOIN categories c2
  //                 ON c1.id = c2.parent_id`
  //     database.query(query, (err, result) => {
  //         if (err) {
  //             return res.status(500).send(err)
  //         }

  //         res.status(200).send(result)
  //     })
  // },
  getCategoryDetailsById: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const queryCatDetsByID = `SELECT c1.id, c1.category, c2.category as child 
                    FROM categories c1
                    JOIN categories c2
                    ON c1.id = c2.parent_id
                    WHERE c1.id = ${id}`;
      const resultCatDetsByID = await asyncQuery(queryCatDetsByID);
      res.status(200).send(resultCatDetsByID);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
  // getCategoryDetailsById : (req, res) => {
  //     const id = parseInt(req.params.id)
  //     const query = `SELECT c1.id, c1.category, c2.category as child
  //                 FROM categories c1
  //                 JOIN categories c2
  //                 ON c1.id = c2.parent_id
  //                 WHERE c1.id = ${id}`
  //     database.query(query, (err, result) => {
  //         if (err) {
  //             return res.status(500).send(err)
  //         }

  //         res.status(200).send(result)
  //     })
  // },
  // delete : (req, res) => {
  //     const id = parseInt(req.params.id)

  //     const del = `DELETE FROM categories WHERE id = ${id}`
  //     database.query(del, (err, result) => {
  //         if (err) {
  //             return res.status(500).send(err)
  //         }

  //         res.status(200).send(result)
  //     })
  // },
  delete: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const del = `DELETE FROM categories WHERE id = ${id}`;
      const resultdel = await asyncQuery(del);
      res.status(200).send(resultdel);
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  // get data with query parameters
  //   getCategoryByQuery: (req, res) => {
  //     console.log("query : ", req.query);
  //     const { category, child } = req.query;

  //     const query = `SELECT c1.id, c1.category, c2.category as child, c2.id as child_id
  //                     FROM categories c1
  //                     JOIN categories c2
  //                     ON c1.id = c2.parent_id
  //                     HAVING c1.category = ${database.escape(
  //                       category
  //                     )} OR c1.id = ${database.escape(child)}`;
  //     console.log(query);
  //     database.query(query, (err, result) => {
  //       if (err) {
  //         res.status(500).send(err);
  //       }

  //       res.status(200).send(result);
  //     });
  //   },

  // get data with query parameters
  getCategoryByQuery: async (req, res) => {
    console.log("query : ", req.query);
    const { category, child } = req.query;

    try {
      const queryCBQ = `SELECT c1.id, c1.category, c2.category as child, c2.id as child_id
                       FROM categories c1
                       JOIN categories c2
                       ON c1.id = c2.parent_id
                       HAVING c1.category = ${database.escape(
                         category
                       )} OR c1.id = ${database.escape(child)}`;
      console.log(queryCBQ);
      const resultCatByQuery = await asyncQuery(queryCBQ);
      res.status(200).send(resultCatByQuery);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getLeafNodes: async (req, res) => {
    const queryLN = `SELECT c1.id, c1.category FROM categories c1
                    LEFT JOIN categories c2 ON c1.id = c2.parent_id
                    WHERE c2.id IS NULL`;
    try {
      const resultQueryLN = await asyncQuery(queryLN);
      res.status(200).send(resultQueryLN);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  //   getLeafNodes: (req, res) => {
  //     const query = `SELECT c1.id, c1.category FROM categories c1
  //                     LEFT JOIN categories c2 ON c1.id = c2.parent_id
  //                     WHERE c2.id IS NULL`;
  //     database.query(query, (err, result) => {
  //       if (err) {
  //         return res.status(500).send(err);
  //       }

  //       res.status(200).send(result);
  //     });
  //   },

  editCategory: async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const editQuerry = `UPDATE categories SET ${generateQuery(
        req.body
      )} WHERE id = ${id}`;
      console.log(editQuerry);
      const resultEditQuerry = await asyncQuery(editQuerry);
      res.status(200).send(resultEditQuerry);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //   editCategory: (req, res) => {
  //     const id = parseInt(req.params.id);

  //     const edit = `UPDATE categories SET ${generateQuery(
  //       req.body
  //     )} WHERE id = ${id}`;
  //     console.log(edit);
  //     database.query(edit, (err, result) => {
  //       if (err) {
  //         return res.status(500).send(err);
  //       }

  //       res.status(200).send(result);
  //     });
  //   },
};

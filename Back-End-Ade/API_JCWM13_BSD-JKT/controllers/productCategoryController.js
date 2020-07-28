const { asyncQuery } = require('../helpers/queryHelp')

module.exports = {
    getProductCategory : async (req, res) => {
        const get = 'SELECT * FROM product_category'
        try {
            const result = await asyncQuery(get)
            res.status(200).send(result)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    getProductCategoryDetails : async (req, res) => {
        try {
            const get = `SELECT * FROM product_category_details`
            const result = await asyncQuery(get)

            res.status(200).send(result)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    addProductCategory : async (req, res) => {
        console.log('body : ', req.body)
        const { product_id, category_id } = req.body
        try {
            // get parent category_id
            const getCategoryId = `WITH RECURSIVE category_path (id, category, parent_id) AS
                                (
                                    SELECT id, category, parent_id
                                        FROM categories
                                        WHERE id = ${category_id} -- child node
                                    UNION ALL
                                    SELECT c.id, c.category, c.parent_id
                                        FROM category_path AS cp JOIN categories AS c
                                        ON cp.parent_id = c.id
                                )
                                SELECT id FROM category_path;`
            const categoryId = await asyncQuery(getCategoryId)

            // insert query
            let value = ''
            categoryId.forEach(item => value += `(${product_id}, ${item.id}),`)
            const insertQuery = `INSERT INTO product_category (product_id, category_id)
                                VALUES ${value.slice(0, -1)}`
            console.log(insertQuery)
            const result = await asyncQuery(insertQuery)

            // sent response to client
            res.status(200).send(result)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    delete : async (req, res) => {
        console.log('params : ', req.params)
        const id = parseInt(req.params.id)

        try {
            const del = `DELETE FROM product_category WHERE product_id = ${id}`
            const result = await asyncQuery(del)

            res.status(200).send(result)

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}
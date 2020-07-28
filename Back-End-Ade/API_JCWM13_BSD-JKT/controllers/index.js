// import all controller
const userController = require('./userController')
const categoryController = require('./categoryController')
const productController = require('./productController')
const productCategoryController = require('./productCategoryController')

// export all controller
module.exports = {
    userController,
    categoryController,
    productController,
    productCategoryController
}
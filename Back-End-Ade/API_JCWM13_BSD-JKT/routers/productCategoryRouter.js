const router = require('express').Router()

//import controller
const { productCategoryController } = require('../controllers')

router.get('/product_category', productCategoryController.getProductCategory)
router.get('/product_category/details', productCategoryController.getProductCategoryDetails)
router.post('/product_category/add', productCategoryController.addProductCategory)
router.delete('/product_category/delete/:id', productCategoryController.delete)

module.exports = router
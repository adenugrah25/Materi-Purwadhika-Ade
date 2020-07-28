const router = require('express').Router()

const { productController } = require('../controllers')

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProductById)
router.patch('/products/edit/:id', productController.editProduct)
router.delete('/products/delete/:id', productController.deleteProduct)
router.post('/products/add', productController.addProduct)

module.exports = router
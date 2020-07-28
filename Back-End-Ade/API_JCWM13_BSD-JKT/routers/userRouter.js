// import module
const router = require('express').Router()
const { validator, validatePassword } = require('../helpers/validator')

// import controller
const { userController } = require('../controllers')

// create router
router.get('/users', userController.getUserData)
router.post('/login', userController.login)
router.post('/register', validator, userController.register)
router.delete('/users/:id', userController.delete)
router.patch('/users/:id', userController.edit)
router.patch('/users/pass/:id', validatePassword, userController.editPass)

// export router
module.exports = router
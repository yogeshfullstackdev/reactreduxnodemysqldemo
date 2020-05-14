const express = require('express')
const router = express.Router()

const authController = require('../controllers/userAuthController')
const validationCheckMiddleware = require('../middleware/validationCheck');

// login
router.post('/:username', authController.login);

// Register
router.post('/', validationCheckMiddleware.validateRegister, authController.register);

module.exports = router



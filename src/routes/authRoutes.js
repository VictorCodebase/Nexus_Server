const express = require('express')
const router = express.Router();
const authController = require("../controllers/authController"); 
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/register', authController.register)
router.post('/register-admin', verifyToken, checkRole(['admin']), authController)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/user', authController.getUser)

module.exports = router
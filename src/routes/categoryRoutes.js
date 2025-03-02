const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.addCategories)

module.exports = router
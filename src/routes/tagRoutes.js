const express = require('express')
router = express.Router()
const tagsController = require('../controllers/tagController')

router.get('/', tagsController.getTags)
router.post('/', tagsController.addTags)

module.exports = router
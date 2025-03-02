const express = require('express')
const router = express.Router()
const paperController = require('../controllers/paperController') 

router.post('/', paperController.uploadPaper)
router.get('/', paperController.getPapers)
router.get('/:id', paperController.getPaperById)
router.put('/:id', paperController.updatePaper)
router.delete('/:id', paperController.deletePaper)

module.exports = router 
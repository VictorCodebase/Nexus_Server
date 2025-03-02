const express = require('express')
const router = express.Router()
const paperController = require('../controllers/paperController') 
const { verifyToken, checkRole } = require('../../middleware/authMiddleware')

router.post('/', verifyToken, checkRole(['admin', 'author']),paperController.uploadPaper)
router.get('/', paperController.getPapers)
router.get('/:id', paperController.getPaperById) //TODO: le tthis allow pagination (instead of sendign everything)
router.put('/:id', verifyToken, checkRole(['author']),paperController.updatePaper) //TODO: Confirm if admin has rights to update paper
router.delete('/:id', verifyToken, checkRole(['admin', 'author']), paperController.deletePaper)

module.exports = router 
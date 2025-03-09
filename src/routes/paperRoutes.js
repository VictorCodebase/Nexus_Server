const express = require("express");
const router = express.Router();
const paperController = require("../controllers/paperController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

router.post("/", verifyToken, checkRole(["admin", "author"]), upload.single("paper"), paperController.uploadPaper);
router.get("/", paperController.getPapers);
router.get("/:id", paperController.getPaperById); //TODO: le tthis allow pagination (instead of sendign everything)
router.put("/:id", verifyToken, checkRole(["author", "admin"]), paperController.updatePaper); //TODO: Confirm if it is okay admin has rights to update paper
router.delete("/:id", verifyToken, checkRole(["admin", "author"]), paperController.deletePaper);

module.exports = router;

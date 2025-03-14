const express = require("express");
const router = express.Router();
const paperController = require("../controllers/paperController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

router.post(
	"/",
	verifyToken,
	(req, res, next) => {
		console.log("Request reached multer, before upload");
		console.log("Body: ", req.body);
		console.log("Files: ", req.files);
		next();
	},
	checkRole(["admin", "author"]),
	(req, res) => {
		upload.single("paper")(req, res, (err) => {
			if (err) {
				console.error("Multer Error: ", err);
				return res.status(400).json({ error: "File upload failed", details: err.message });
			}
            console.log("Multer Executed")
            console.log("received file: ", req.file)

            if (!req.file) {
                return res.status(400).json({error: "No file uploaded"})
            }

            res.status(200).json({message: "Upload successful"})
		});
	},
	paperController.uploadPaper
);
router.get("/", paperController.getPapers);
router.get("/:id", paperController.getPaperById); //TODO: le tthis allow pagination (instead of sendign everything)
router.put("/:id", verifyToken, checkRole(["author", "admin"]), paperController.updatePaper); //TODO: Confirm if it is okay admin has rights to update paper
router.delete("/:id", verifyToken, checkRole(["admin", "author"]), paperController.deletePaper);

module.exports = router;

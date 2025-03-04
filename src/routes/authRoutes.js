const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/register-admin",  authController.registerAdmin);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/user", verifyToken, authController.getUser);

module.exports = router;

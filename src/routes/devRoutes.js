const express = require("express");
const router = express.Router();
const devController = require("../controllers/devController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

router.delete("/tables", verifyToken, checkRole["admin"], devController.resetTables());
router.delete("/table", verifyToken, checkRole["admin"], devController.resetTable());
router.get("/restore", verifyToken, checkRole["admin"], devController.restoreTables);

// perrosRoutes.js
const express = require("express");
const router = express.Router();
const perrosController = require("../controllers/perrosController");

router.get("/", perrosController.logUrlMiddleware, perrosController.show);

module.exports = router;


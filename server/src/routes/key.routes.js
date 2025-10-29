const express = require("express");
const router = express.Router();
const { generateKeys } = require("../controllers/key.controller");

// Generate initial 100 keys
router.post("/generate-100-keys", generateKeys);

module.exports = router;

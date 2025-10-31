const express = require("express");
const router = express.Router();
const { generateKeys, sendRandomKey } = require("../controllers/key.controller");

router.post("/generate-100-keys", generateKeys);
router.post("/send-random-key", sendRandomKey);

module.exports = router;

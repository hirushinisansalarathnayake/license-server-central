const crypto = require("crypto");

function generateRandomKey() {
  return crypto.randomBytes(16).toString("hex").toUpperCase();
}

module.exports = generateRandomKey;

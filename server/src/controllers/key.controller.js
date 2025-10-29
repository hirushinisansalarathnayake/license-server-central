const KeyModel = require("../models/keys.model");
const generateRandomKey = require("../utils/randomKeyGenerator");

exports.generateKeys = async (req, res) => {
  try {
    for (let i = 0; i < 100; i++) {
      const randomKey = generateRandomKey();
      await KeyModel.createKey(randomKey);
    }

    res.json({
      status: "success",
      message: "100 activation keys generated successfully!"
    });
  } catch (error) {
    console.error("Key generation failed:", error);
    res.status(500).json({ error: "Key generation failed" });
  }
};

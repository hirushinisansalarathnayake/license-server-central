const KeyModel = require("../models/keys.model");
const generateRandomKey = require("../utils/randomKeyGenerator");
const { sendKeyToEngineer } = require("../services/email.service");

exports.generateKeys = async (req, res) => {
  try {
    for (let i = 0; i < 100; i++) {
      const randomKey = generate RandomKey();
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

exports.sendRandomKey = async (req, res) => {
  try {
    const randomKey = await KeyModel.getRandomKey();
    if (!randomKey) {
      return res.status(404).json({ message: "No unused keys available." });
    }

    // Example engineer email (later you can use dynamic emails)
    const engineerEmail = "hirushir99@gmail.com";

    await sendKeyToEngineer(engineerEmail, randomKey.key_value);

    res.json({
      status: "success",
      message: `Key sent to ${engineerEmail}`,
      key: randomKey.key_value,
    });
  } catch (error) {
    console.error("Error sending random key:", error);
    res.status(500).json({ error: "Failed to send activation key" });
  }
};



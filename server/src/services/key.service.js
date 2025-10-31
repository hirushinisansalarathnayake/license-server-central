const KeyModel = require("../models/keys.model");

async function getRandomActivationKey() {
  try {
    const key = await KeyModel.assignRandomKey();
    return key; // key string or null
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getRandomActivationKey
};

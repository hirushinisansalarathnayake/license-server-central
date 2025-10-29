const KeyModel = require("./models/keys.model");

async function testAssignKey() {
  try {
    const key = await KeyModel.assignRandomKey();
    if (!key) {
      console.log("No available keys left in DB.");
    } else {
      console.log("Assigned Key:", key);
    }
  } catch (err) {
    console.error("Error assigning key:", err);
  }
}

testAssignKey();

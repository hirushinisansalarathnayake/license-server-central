const pool = require("../config/db");

const KeyModel = {

  createKey: async (keyValue) => {
    const [result] = await pool.query(
      "INSERT INTO central_license_activation_keys (key_value, status) VALUES (?, 'unused')",
      [keyValue]
    );
    return result.insertId;
  },

  getRandomKey: async () => {
    const [rows] = await pool.query(
      "SELECT * FROM central_license_activation_keys WHERE status='sent' ORDER BY RAND() LIMIT 1"
    );
    return rows[0];
  },

  deleteKey: async (keyId) => {
    await pool.query(
      "DELETE FROM central_license_activation_keys WHERE id = ?",
      [keyId]
    );
    return true;
  },

  assignRandomKey: async () => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Pick a random unused key and lock it
      const [rows] = await conn.query(
        "SELECT id, key_value FROM central_license_activation_keys WHERE status = 'unused' ORDER BY RAND() LIMIT 1 FOR UPDATE"
      );

      if (!rows || rows.length === 0) {
        await conn.rollback();
        return null; // no keys available
      }

      const keyRow = rows[0];

      // Mark as sent
      await conn.query(
        "UPDATE central_license_activation_keys SET status='sent' WHERE id=?",
        [keyRow.id]
      );

      await conn.commit();
      return keyRow.key_value;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
};

module.exports = KeyModel;

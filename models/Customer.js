const db = require("../config/database");

const Customer = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM customers");
    return rows;
  },
  create: async (name) => {
    const [result] = await db.query("INSERT INTO customers (name) VALUES (?)", [
      name,
    ]);
    return result.insertId;
  },
  update: async (id, name) => {
    const [result] = await db.query(
      "UPDATE customers SET name = ? WHERE id = ?",
      [name, id]
    );
    return result;
  },
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM customers WHERE id = ?", [id]);
    return result;
  },
};

module.exports = Customer;

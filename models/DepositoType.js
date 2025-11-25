const db = require("../config/database");

const DepositoType = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM deposito_types");
    return rows;
  },

  create: async (name, yearlyReturn) => {
    const sql =
      "INSERT INTO deposito_types (name, yearly_return) VALUES (?, ?)";
    const [result] = await db.query(sql, [name, yearlyReturn]);
    return result.insertId;
  },

  update: async (id, name, yearlyReturn) => {
    const sql =
      "UPDATE deposito_types SET name = ?, yearly_return = ? WHERE id = ?";
    const [result] = await db.query(sql, [name, yearlyReturn, id]);
    return result;
  },

  delete: async (id) => {
    const sql = "DELETE FROM deposito_types WHERE id = ?";
    const [result] = await db.query(sql, [id]);
    return result;
  },
};

module.exports = DepositoType;

const db = require("../config/database");

const Account = {
  getAll: async () => {
    const sql = `
            SELECT a.id, a.balance, a.last_transaction_date, 
                   c.name as customer_name, 
                   d.name as deposito_name, d.yearly_return
            FROM accounts a
            JOIN customers c ON a.customer_id = c.id
            JOIN deposito_types d ON a.deposito_type_id = d.id
        `;
    const [rows] = await db.query(sql);
    return rows;
  },

  findById: async (id) => {
    const sql = `
      SELECT a.*, d.yearly_return, d.name as deposito_name
      FROM accounts a
      JOIN deposito_types d ON a.deposito_type_id = d.id
      WHERE a.id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },


  create: async (customerId, typeId, initialDate) => {
    const sql =
      "INSERT INTO accounts (customer_id, deposito_type_id, balance, last_transaction_date) VALUES (?, ?, 0, ?)";
    const [result] = await db.query(sql, [customerId, typeId, initialDate]);
    return result;
  },

  updateBalance: async (id, newBalance, date) => {
    const sql =
      "UPDATE accounts SET balance = ?, last_transaction_date = ? WHERE id = ?";
    return await db.query(sql, [newBalance, date, id]);
  },

  updateType: async (id, depositoTypeId) => {
    const sql = "UPDATE accounts SET deposito_type_id = ? WHERE id = ?";
    return await db.query(sql, [depositoTypeId, id]);
  },

  delete: async (id) => {
    const sql = "DELETE FROM accounts WHERE id = ?";
    return await db.query(sql, [id]);
  },
};

module.exports = Account;

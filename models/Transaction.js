const db = require("../config/database");

const Transaction = {
  create: async (accountId, type, amount, date) => {
    const sql =
      "INSERT INTO transactions (account_id, type, amount, transaction_date) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(sql, [accountId, type, amount, date]);
    return result;
  },

  getByAccountId: async (accountId) => {
    const sql =
      "SELECT * FROM transactions WHERE account_id = ? ORDER BY transaction_date DESC";
    const [rows] = await db.query(sql, [accountId]);
    return rows;
  },
};

module.exports = Transaction;

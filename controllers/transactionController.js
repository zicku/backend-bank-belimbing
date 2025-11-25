const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

exports.calculateWithdraw = async (req, res) => {
  try {
    const { accountId, withdrawDate } = req.body;
    const account = await Account.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: "Akun tidak ditemukan" });
    }

    const currentBalance = parseFloat(account.balance);
    const yearlyReturn = parseFloat(account.yearly_return);
    const lastDate = new Date(account.last_transaction_date);
    const withdraw = new Date(withdrawDate);

    // Validasi Tanggal
    if (withdraw < lastDate) {
      return res
        .status(400)
        .json({ message: "Tanggal penarikan tidak boleh mundur" });
    }

    // Hitung selisih tahun & bulan
    let months = (withdraw.getFullYear() - lastDate.getFullYear()) * 12;
    months -= lastDate.getMonth();
    months += withdraw.getMonth();

    if (withdraw.getDate() < lastDate.getDate()) {
      months--;
    }
    months = months < 0 ? 0 : months;
    const monthlyReturnRate = yearlyReturn / 100 / 12;
    const interestEarned = currentBalance * months * monthlyReturnRate;
    const endingBalance = currentBalance + interestEarned;

    res.json({
      duration_months: months,
      interest: interestEarned,
      ending_balance: endingBalance,
      // Debug info
      debug: {
        saldo: currentBalance,
        bunga_tahunan: yearlyReturn,
        mulai: lastDate,
        akhir: withdraw,
      },
    });
  } catch (error) {
    console.error("Error Calculation:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.processTransaction = async (req, res) => {
  try {
    const { accountId, type, amount, date } = req.body;

    const account = await Account.findById(accountId);
    if (!account)
      return res.status(404).json({ message: "Akun tidak ditemukan" });

    const currentBalance = parseFloat(account.balance);
    const inputAmount = parseFloat(amount);
    let newBalance = 0;

    if (type === "deposit") {
      newBalance = currentBalance + inputAmount;
    } else if (type === "withdraw") {
      if (currentBalance < inputAmount) {
        return res.status(400).json({ message: "Saldo tidak mencukupi" });
      }
      newBalance = currentBalance - inputAmount;
    }
    await Account.updateBalance(accountId, newBalance, date);
    await Transaction.create(accountId, type, inputAmount, date);

    res.json({ message: "Transaksi Berhasil", newBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

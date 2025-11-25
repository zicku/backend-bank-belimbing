module.exports = (req, res, next) => {
  const { accountId, type, amount, date } = req.body;

  if (!accountId) {
    return res.status(400).json({ message: "ID Akun tidak valid!" });
  }
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Jumlah uang harus lebih dari 0!" });
  }
  if (!date) {
    return res.status(400).json({ message: "Tanggal transaksi wajib diisi!" });
  }
  if (type !== "deposit" && type !== "withdraw") {
    return res
      .status(400)
      .json({ message: "Tipe transaksi salah (harus deposit/withdraw)!" });
  }

  next();
};

const Customer = require("../models/Customer");
const DepositoType = require("../models/DepositoType");
const Account = require("../models/Account");

exports.getData = async (req, res) => {
  try {
    const customers = await Customer.getAll();
    const types = await DepositoType.getAll();
    const accounts = await Account.getAll();
    res.json({ customers, types, accounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- CRUD CUSTOMER ---

exports.createCustomer = async (req, res) => {
  try {
    await Customer.create(req.body.name);
    res.json({ message: "Customer Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Customer.update(id, name);
    res.json({ message: "Customer Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.delete(id);
    res.json({ message: "Customer Deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus. Customer mungkin masih memiliki akun aktif.",
    });
  }
};

// --- CRUD ACCOUNT ---

exports.createAccount = async (req, res) => {
  try {
    const { customer_id, deposito_type_id } = req.body;
    const today = new Date().toISOString().split("T")[0];
    await Account.create(customer_id, deposito_type_id, today);
    res.json({ message: "Account Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { deposito_type_id } = req.body;
    await Account.updateType(id, deposito_type_id);
    res.json({ message: "Account Type Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await Account.delete(id);
    res.json({ message: "Account Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- CRUD DEPOSITO TYPE (BAGIAN YANG DIPERBAIKI) ---

exports.createDepositoType = async (req, res) => {
  try {
    // 1. Debugging: Cek data yang masuk
    console.log("Data diterima dari frontend:", req.body);

    // 2. Ambil data sesuai nama kolom di database Anda (name, yearly_return)
    const { name, yearly_return } = req.body;

    // 3. Validasi: Pastikan data tidak kosong
    if (!name || yearly_return === undefined || yearly_return === "") {
      return res.status(400).json({ message: "Nama dan Bunga wajib diisi!" });
    }

    // 4. Konversi bunga ke angka float untuk mencegah error database
    const rate = parseFloat(yearly_return);
    if (isNaN(rate)) {
      return res
        .status(400)
        .json({ message: "Bunga harus berupa angka (contoh: 5.5)" });
    }

    // 5. Panggil Model dengan parameter yang benar
    await DepositoType.create(name, rate);

    res.status(201).json({ message: "Deposito Type Created" });
  } catch (error) {
    console.error("Error createDepositoType:", error);
    res.status(500).json({
      message: "Gagal menyimpan data",
      error: error.message,
    });
  }
};

exports.updateDepositoType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, yearly_return } = req.body;

    // Validasi & Konversi juga untuk update
    const rate = parseFloat(yearly_return);

    await DepositoType.update(id, name, rate);
    res.json({ message: "Deposito Type Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDepositoType = async (req, res) => {
  try {
    const { id } = req.params;
    await DepositoType.delete(id);
    res.json({ message: "Deposito Type Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

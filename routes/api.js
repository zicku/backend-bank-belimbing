const express = require("express");
const router = express.Router();

const masterController = require("../controllers/masterController");
const transactionController = require("../controllers/transactionController");
const customerValidation = require("../middleware/customerValidation");
const accountValidation = require("../middleware/accountValidation");
const transactionValidation = require("../middleware/transactionValidation");

router.get("/dashboard-data", masterController.getData);

// --- CUSTOMER  ---
router.post("/customers", customerValidation, masterController.createCustomer);
router.put(
  "/customers/:id",
  customerValidation,
  masterController.updateCustomer
);
router.delete("/customers/:id", masterController.deleteCustomer);

// --- DEPOSITO TYPES (Tambahkan Bagian Ini) ---
// Ini yang sebelumnya hilang sehingga menyebabkan error saat create/update/delete
router.post("/deposito-types", masterController.createDepositoType);
router.put("/deposito-types/:id", masterController.updateDepositoType);
router.delete("/deposito-types/:id", masterController.deleteDepositoType);

// --- ACCOUNT ---
router.post("/accounts", accountValidation, masterController.createAccount);
router.put("/accounts/:id", masterController.updateAccount);
router.delete("/accounts/:id", masterController.deleteAccount);

// --- TRANSACTION  ---
router.post(
  "/transaction",
  transactionValidation,
  transactionController.processTransaction
);

// Calculate
router.post("/calculate", transactionController.calculateWithdraw);

module.exports = router;

module.exports = (req, res, next) => {
  const { customer_id, deposito_type_id } = req.body;
  if (!customer_id || !deposito_type_id) {
    return res
      .status(400)
      .json({ message: "Harap pilih Nasabah dan Paket Deposito!" });
  }
  next();
};

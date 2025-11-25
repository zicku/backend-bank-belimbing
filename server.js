const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server Belimbing Bank berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;

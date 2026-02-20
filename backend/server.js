const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Routes register
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.send("API Running...");
});

// DB connection test
db.getConnection()
  .then((connection) => {
    console.log("MySQL Connected...");
    connection.release();
  })
  .catch((err) => {
    console.error(" MySQL Connection Failed:", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

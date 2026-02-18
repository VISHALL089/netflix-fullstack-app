const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initDB } = require("./db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", movieRoutes);

const PORT = process.env.PORT || 5000;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const initDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database initialization error:", err);
    process.exit(1);
  }
};

module.exports = {
  pool,
  initDB,
};

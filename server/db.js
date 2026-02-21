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

    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password TEXT,
        phone VARCHAR(15)
      )
    `);
    console.log("Users table verified/created");
  } catch (err) {
    console.error("Database initialization error:", err);
    process.exit(1);
  }
};
//fdfdf
module.exports = {
  pool,
  initDB,
};

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password TEXT,
        phone VARCHAR(15)
      );
    `);

    console.log("Connected to PostgreSQL");
    console.log("Users table ready");
  } catch (error) {
    console.error("Database initialization error:", error);
    process.exit(1);
  }
};

module.exports = { pool, initDB };

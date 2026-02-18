const { Pool } = require("pg");

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
        password VARCHAR(255),
        phone VARCHAR(20)
      )
    `);

    console.log("Database connected and table ready");
  } catch (err) {
    console.error("Database initialization error:", err);
    process.exit(1);
  }
};

module.exports = {
  pool,
  initDB,
};

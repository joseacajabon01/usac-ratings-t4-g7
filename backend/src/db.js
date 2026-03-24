require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4_general_ci',
});

// Forzar UTF-8 al iniciar
pool.getConnection().then(async (conn) => {
  try { await conn.query("SET NAMES utf8mb4"); } finally { conn.release(); }
}).catch(()=>{});

module.exports = { pool };

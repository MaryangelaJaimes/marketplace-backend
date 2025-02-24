const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .query("SELECT NOW()")
  .then(() => console.log("✅ Conexión a la base de datos exitosa"))
  .catch((err) =>
    console.error("❌ Error al conectar a la base de datos:", err)
  );

module.exports = pool;

const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Para cargar las variables de entorno
const rutas = require("./routes");

const app = express();

// =====================
// 🔹 MIDDLEWARES
// =====================
app.use(cors());
app.use(express.json()); // Para recibir JSON en las peticiones

// =====================
// 🔹 RUTAS PRINCIPALES
// =====================
app.use("/", rutas); // Se mantiene el prefijo en `routes/index.js`

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const productRoutes = require("./productRoutes");

const router = express.Router();

// =====================
// 🔹 RUTA DE PRUEBA
// =====================
router.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente!" });
});

// =====================
// 🔹 AUTENTICACIÓN
// =====================
router.post("/api/login", authController.login); // Agregado /api para consistencia
router.post("/api/register", authController.register); // Agregado /api

// =====================
// 🔹 USUARIOS (Rutas protegidas)
// =====================
router.get("/api/users", auth, userController.getUsers);
router.get("/api/users/:id", auth, userController.getUserById);

// =====================
// 🔹 PRODUCTOS
// =====================
router.use("/api/productos", productRoutes); // Agregado /api para evitar confusión

module.exports = router;

const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const productRoutes = require("./productRoutes");
const publicacionRoutes = require("./publicacionRoutes"); // Importar las rutas de publicaciones

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
router.post("/api/login", authController.login);
router.post("/api/register", authController.register);

// =====================
// 🔹 USUARIOS (Rutas protegidas)
// =====================
router.get("/api/users", auth, userController.getUsers);
router.get("/api/users/:id", auth, userController.getUserById);

// =====================
// 🔹 PRODUCTOS
// =====================
router.use("/api/productos", productRoutes);

// =====================
// 🔹 PUBLICACIONES (Rutas protegidas)
// =====================
router.use("/api/publicaciones", auth, publicacionRoutes); // Integrar las rutas de publicaciones

module.exports = router;

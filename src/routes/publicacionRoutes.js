const express = require("express");
const auth = require("../middlewares/auth");
const publicacionController = require("../controllers/publicacionController");

const router = express.Router();

// Ruta para crear una publicación (POST /api/publicaciones)
router.post("/", auth, publicacionController.crearPublicacion);

// Ruta para obtener las publicaciones de un usuario (GET /api/publicaciones)
router.get("/", auth, publicacionController.obtenerPublicaciones);

// Ruta para eliminar una publicación (DELETE /api/publicaciones/:id)
router.delete("/:id", auth, publicacionController.eliminarPublicacion);

module.exports = router;

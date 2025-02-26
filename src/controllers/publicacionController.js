const pool = require("../db");

// Crear una publicación
const crearPublicacion = async (req, res) => {
  const { titulo, descripcion } = req.body;

  console.log("🔍 Datos recibidos:", { titulo, descripcion });
  console.log("🔍 Usuario autenticado:", req.user);

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const usuario_id = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO publicaciones (titulo, descripcion, usuario_id) VALUES ($1, $2, $3) RETURNING *",
      [titulo, descripcion, usuario_id]
    );

    console.log("✅ Publicación creada:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al crear publicación:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener publicaciones de un usuario
const obtenerPublicaciones = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const usuario_id = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM publicaciones WHERE usuario_id = $1",
      [usuario_id]
    );

    console.log("📄 Publicaciones obtenidas:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener publicaciones:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Eliminar una publicación
const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Usuario no autenticado" });
  }

  const usuario_id = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM publicaciones WHERE id = $1 AND usuario_id = $2 RETURNING *",
      [id, usuario_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Publicación no encontrada" });
    }

    console.log("🗑️ Publicación eliminada:", result.rows[0]);

    res.json({ message: "Publicación eliminada" });
  } catch (error) {
    console.error("❌ Error al eliminar publicación:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Exportar las funciones del controlador
module.exports = {
  crearPublicacion,
  obtenerPublicaciones,
  eliminarPublicacion,
};

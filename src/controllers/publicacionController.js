const pool = require("../db");

// Crear una publicación
const crearPublicacion = async (req, res) => {
  const { titulo, descripcion } = req.body;
  const usuario_id = req.user.id;

  try {
    // Insertar la publicación en la base de datos
    const result = await pool.query(
      "INSERT INTO publicaciones (titulo, descripcion, usuario_id) VALUES ($1, $2, $3) RETURNING *",
      [titulo, descripcion, usuario_id]
    );

    // Devolver la publicación creada
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear publicación:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Obtener publicaciones de un usuario
const obtenerPublicaciones = async (req, res) => {
  const usuario_id = req.user.id; // Obtener el ID del usuario autenticado desde el token

  try {
    // Obtener todas las publicaciones del usuario
    const result = await pool.query(
      "SELECT * FROM publicaciones WHERE usuario_id = $1",
      [usuario_id]
    );

    // Devolver las publicaciones
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Eliminar una publicación
const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id;

  try {
    // Eliminar la publicación solo si pertenece al usuario
    await pool.query(
      "DELETE FROM publicaciones WHERE id = $1 AND usuario_id = $2",
      [id, usuario_id]
    );

    // Devolver un mensaje de éxito
    res.json({ message: "Publicación eliminada" });
  } catch (error) {
    console.error("Error al eliminar publicación:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// Exportar las funciones del controlador
module.exports = {
  crearPublicacion,
  obtenerPublicaciones,
  eliminarPublicacion,
};

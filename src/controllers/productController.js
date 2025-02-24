import db from "../db/index.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM productos WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const result = await db.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, descripcion, precio, stock]
    );
    res
      .status(201)
      .json({ message: "Producto creado", producto: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;
    await db.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5",
      [nombre, descripcion, precio, stock, id]
    );
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM productos WHERE id = $1", [id]);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

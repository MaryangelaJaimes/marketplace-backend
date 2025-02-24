const jwt = require("jsonwebtoken");
const pool = require("../db");
const bcrypt = require("bcrypt");

// Iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const user = userResult.rows[0];

    // Comparar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "defaultsecret",
      {
        expiresIn: "1h",
      }
    );

    // Eliminar la contraseña antes de enviar la respuesta
    const { password: _, ...userData } = user;

    return res.json({ token, usuario: userData });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

// Registrar usuario
const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    console.log("➡️ Recibiendo datos:", { nombre, email, password });

    // Verificar si el usuario ya existe
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    console.log("🔍 Verificación de usuario:", userExist.rows);

    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("🔑 Contraseña hasheada correctamente.");

    // Guardar el usuario en la base de datos
    const newUser = await pool.query(
      "INSERT INTO users (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, hashedPassword]
    );
    console.log("✅ Usuario creado:", newUser.rows[0]);

    // Crear token para el usuario
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token, usuario: newUser.rows[0] });
  } catch (error) {
    console.error("❌ Error en register:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  login,
  register,
};

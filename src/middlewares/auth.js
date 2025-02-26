const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado, no hay token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = auth;

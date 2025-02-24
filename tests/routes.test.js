const request = require("supertest");
const app = require("../src/app");

describe("Pruebas de rutas", () => {
  // ruta básica
  it("GET /api debería retornar 200 OK", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Funcionando!" });
  });

  //  autenticación
  it("POST /api/login con credenciales correctas debería retornar 200 OK", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "user@example.com", password: "123456" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  // obtener usuarios (protegida)
  it("GET /api/users sin token debería retornar 401 Unauthorized", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(401);
  });

  // usuario por ID
  it("GET /api/users/1 con token válido debería retornar 200 OK", async () => {
    const loginRes = await request(app)
      .post("/api/login")
      .send({ email: "user@example.com", password: "123456" });
    const token = loginRes.body.token;

    const res = await request(app)
      .get("/api/users/1")
      .set("Authorization", token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
  });
});

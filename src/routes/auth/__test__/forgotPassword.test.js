const request = require("supertest");
const { app } = require("../../../app");

describe("test the forgot-password api end point", () => {
  it("returns a 400 with missing email", async () => {
    await request(app)
      .post("/api/v1/users/forgot-password")
      .send({ email: "" })
      .expect(400);
  });

  it("returns a 404 with invalid email", async () => {
    await request(app)
      .post("/api/v1/users/forgot-password")
      .send({
        email: "invalid@test.com",
      })
      .expect(404);
  });

  it("returns a 200 with valid email", async () => {
    await request(app)
      .post("/api/v1/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    await request(app)
      .post("/api/v1/users/forgot-password")
      .send({
        email: "test@test.com",
      })
      .expect(200);
  });
});

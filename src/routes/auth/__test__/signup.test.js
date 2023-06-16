const request = require("supertest");
const { app } = require("../../../app");

describe("test signup api end point", () => {
  it("returns a 201 on successful signup", async () => {
    return request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
  });

  it("returns a 400 with an invalid email", async () => {
    return request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test.com",
        password: "password",
        country: "country",
      })
      .expect(400);
  });

  it("returns a 400 with missing name or email or password", async () => {
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(400);
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "",
        password: "password",
        country: "country",
      })
      .expect(400);
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "",
        country: "country",
      })
      .expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "password",
      })
      .expect(201);
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(400);
  });

  it("expects a token after signup", async () => {
    const res = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "password",
      })
      .expect(201);

    expect(res.body).toHaveProperty("token");
  });
});

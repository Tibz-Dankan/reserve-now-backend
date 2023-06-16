const request = require("supertest");
const { app } = require("../../../app");

describe("test the signin api end point", () => {
  it("returns a 200 on successful signin", async () => {
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    await request(app)
      .post("/v1/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);
  });

  it("returns 400 with missing email or password ", async () => {
    await request(app)
      .post("/v1/api/users/signin")
      .send({
        email: "",
        password: "password",
      })
      .expect(400);
    await request(app)
      .post("/v1/api/users/signin")
      .send({
        email: "test@test.com",
        password: "",
      })
      .expect(400);
  });

  it("returns 400 when email is invalid", async () => {
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    await request(app)
      .post("/v1/api/users/signin")
      .send({
        email: "t@test.com",
        password: "password",
      })
      .expect(400);
  });

  it("returns 400 when password is invalid", async () => {
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    await request(app)
      .post("/v1/api/users/signin")
      .send({
        email: "test@test.com",
        password: "bsjsa",
      })
      .expect(400);
  });

  it("expects a token after signin", async () => {
    await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const res = await request(app)
      .post("/v1/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);
    expect(res.body).toHaveProperty("token");
  });
});

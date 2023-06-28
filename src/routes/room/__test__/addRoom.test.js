const request = require("supertest");
const { app } = require("../../../app");

describe("test addRoom API endpoint", () => {
  it("returns a 201 on successful room creation", async () => {
    // signup to get token
    const res = await request(app)
      .post("/api/v1/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);

    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "101",
        roomType: "Standard",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(201);
  });

  it("returns a 400 with missing roomNumber||roomType||capacity||price||priceCurrency ", async () => {
    // signup to get token
    const res = await request(app)
      .post("/api/v1/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);

    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "",
        roomType: "Standard",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);

    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "1",
        roomType: "",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);

    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "2",
        roomType: "Standard",
        capacity: "",
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);

    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "2",
        roomType: "Standard",
        capacity: "3",
        price: "",
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);

    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "2",
        roomType: "Standard",
        capacity: "2",
        price: 100,
        priceCurrency: "",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);
  });

  it("disallows duplicate room numbers", async () => {
    const res = await request(app)
      .post("/api/v1/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);

    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "101",
        roomType: "Standard",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(201);
    await request(app)
      .post("/api/v1/rooms/add-room")
      .send({
        roomNumber: "101",
        roomType: "Standard",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);
  });
});

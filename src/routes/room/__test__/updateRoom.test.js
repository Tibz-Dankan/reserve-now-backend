const request = require("supertest");
const { app } = require("../../../app");

describe("test updateRoom API endpoint", () => {
  it("returns a 400 with missing roomNumber||roomType||capacity||price||priceCurrency ", async () => {
    // signup to get token
    const signupResponse = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    // create a room to get room id
    const addRoomResponse = await request(app)
      .post("/v1/api/rooms/add-room")
      .send({
        roomNumber: "101",
        roomType: "Standard",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(201);
    const roomId = addRoomResponse.body.data.id;

    await request(app)
      .patch(`/v1/api/rooms/update-room/${roomId}`)
      .send({
        roomNumber: "",
        roomType: "Standard",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);

    await request(app)
      .patch(`/v1/api/rooms/update-room/${roomId}`)
      .send({
        roomNumber: "1",
        roomType: "",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);

    await request(app)
      .patch(`/v1/api/rooms/update-room/${roomId}`)
      .send({
        roomNumber: "2",
        roomType: "Standard",
        capacity: "",
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);

    await request(app)
      .patch(`/v1/api/rooms/update-room/${roomId}`)
      .send({
        roomNumber: "2",
        roomType: "Standard",
        capacity: "3",
        price: "",
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);

    await request(app)
      .patch("/v1/api/rooms/update-room/:id")
      .query({ id: roomId })
      .send({
        roomNumber: "2",
        roomType: "Standard",
        capacity: "2",
        price: 100,
        priceCurrency: "",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);
  });

  it("returns 404 if no room is found", async () => {
    const signupResponse = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);

    await request(app)
      .patch(`/v1/api/rooms/update-room/1000`)
      .send({
        roomNumber: "5",
        roomType: "Standard",
        capacity: "2",
        price: "100",
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(404);
  });

  it("expects 200 on successful room update", async () => {
    const signupResponse = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const addRoomResponse = await request(app)
      .post("/v1/api/rooms/add-room")
      .send({
        roomNumber: "101",
        roomType: "Standard",
        capacity: "2",
        price: "100",
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(201);
    const roomId = addRoomResponse.body.data.id;

    await request(app)
      .patch(`/v1/api/rooms/update-room/${roomId}`)
      .send({
        roomNumber: "103",
        roomType: "Deluxe",
        capacity: "2",
        price: "100",
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(200);
  });
});

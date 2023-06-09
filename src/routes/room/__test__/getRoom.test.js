const request = require("supertest");
const { app } = require("../../../app");

describe("test getRoom API endpoint", () => {
  it("returns 500 with missing room id", async () => {
    const roomId = null;
    return await request(app)
      .get(`/api/v1/rooms/get-room/${roomId}`)
      .expect(500);
  });

  it("returns 400 with missing room id", async () => {
    const roomId = 1000; //roomId does not in db
    return await request(app)
      .get(`/api/v1/rooms/get-room/${roomId}`)
      .expect(404);
  });

  it("returns 200 on successfully finding room", async () => {
    const signupResponse = await request(app)
      .post("/api/v1/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);

    const addRoomResponse = await request(app)
      .post("/api/v1/rooms/add-room")
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

    await request(app).get(`/api/v1/rooms/get-room/${roomId}`).expect(200);
  });
});

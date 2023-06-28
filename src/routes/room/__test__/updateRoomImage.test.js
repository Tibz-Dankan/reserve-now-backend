const request = require("supertest");
const { app } = require("../../../app");
const fs = require("fs");
const { resolve } = require("path");

describe("test updateRoomImage API endpoint", () => {
  it("returns 400 with non image files", async () => {
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

    const filePath = resolve("./src/test/non-image/test-ppt.pptx");
    await request(app)
      .patch(`/api/v1/rooms/update-room-image/${roomId}`)
      .attach("file", filePath)
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);
  });

  it("returns 200 on successful update of room image", async () => {
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
    const imagePath = resolve("./src/test/image/test-image.png");

    await request(app)
      .patch(`/api/v1/rooms/update-room-image/${roomId}`)
      .attach("file", imagePath)
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(200);
  });
});

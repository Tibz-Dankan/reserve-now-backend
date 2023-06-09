const request = require("supertest");
const { app } = require("../../../app");

describe("test getAllRooms API endpoint", () => {
  it("expects 200 on successful finding of rooms", async () => {
    const res = await request(app)
      .get("/api/v1/rooms/get-all-rooms")
      .expect(200);
    expect(res.body).toHaveProperty("data");
  });
});

const request = require("supertest");
const { app } = require("../../../app");

// npm test -- updateBookingWithRoom.test.js  //To run this test suite

describe("test updateBookingWithRoom api end point", () => {
  it("returns a 400 with missing roomId", async () => {
    const signupResponse = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const userId = signupResponse.body.user.id;

    const addBKDatesResponse = await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        userId: userId,
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(201);
    const bookingId = addBKDatesResponse.body.data.id;

    await request(app)
      .patch(`/v1/api/booking/update-booking-with-room/${bookingId}`)
      .send({
        roomId: "",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);
  });

  it("returns a 200 on successful update of  booking with room", async () => {
    // signup user to get token and userId
    const signupResponse = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const userId = signupResponse.body.user.id;
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
    // add booking to get bookingId
    const addBKDatesResponse = await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        userId: userId,
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(201);
    const bookingId = addBKDatesResponse.body.data.id;

    await request(app)
      .patch(`/v1/api/booking/update-booking-with-room/${bookingId}`)
      .send({
        roomId: roomId,
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(200);
  });
});

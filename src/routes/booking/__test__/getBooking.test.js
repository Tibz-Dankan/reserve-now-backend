const request = require("supertest");
const { app } = require("../../../app");

// npm test -- getBooking.test.js  //To run this test suite

describe("test getBooking api end point", () => {
  it("returns a 200 on successful getting of booking", async () => {
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
      .get(`/v1/api/booking/get-booking/${bookingId}`)
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(200);
  });
});
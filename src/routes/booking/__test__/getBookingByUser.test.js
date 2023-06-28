const request = require("supertest");
const { app } = require("../../../app");

// npm test -- getBookingByUser.test.js  //To run this test suite

describe("test getBooking api end point", () => {
  it("returns a 400 with missing userId", async () => {
    // signup user to get token and userId
    const signupResponse = await request(app)
      .post("/api/v1/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const userId = signupResponse.body.user.id;

    await request(app)
      .post("/api/v1/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        userId: userId,
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(201);

    await request(app)
      .get(`/api/v1/booking/get-booking-by-user`)
      .send({
        userId: "",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);
  });

  it("returns a 200 on successful getting of booking associated with a user", async () => {
    // signup user to get token and userId
    const signupResponse = await request(app)
      .post("/api/v1/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const userId = signupResponse.body.user.id;
    // add booking to get bookingId
    const addBKDatesResponse = await request(app)
      .post("/api/v1/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        userId: userId,
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(201);

    await request(app)
      .get(`/api/v1/booking/get-booking-by-user`)
      .send({
        userId: userId,
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(200);
  });
});

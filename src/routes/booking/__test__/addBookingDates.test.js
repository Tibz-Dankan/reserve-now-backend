const request = require("supertest");
const { app } = require("../../../app");

describe("test addBookingDates api end point", () => {
  it("returns a 400 with missing userId", async () => {
    const res = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        userId: "",
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);
  });

  it("returns a 400 with missing checkInDate or checkOutDate", async () => {
    const res = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const userId = res.body.user.id;

    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: "",
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        userId: userId,
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);
    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: "",
        userId: userId,
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);
  });

  it("returns a 400 with difference btn checkOutDate and checkInDate is less than 24hrs", async () => {
    const res = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const userId = res.body.user.id;

    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 20 * 60 * 60 * 1000
        ).toISOString(),
        userId: userId,
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(400);
  });

  it("returns a 201 on successful adding of booking dates", async () => {
    const res = await request(app)
      .post("/v1/api/users/signup")
      .send({
        name: "test user",
        email: "test@test.com",
        password: "password",
        country: "country",
      })
      .expect(201);
    const userId = res.body.user.id;

    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
        userId: userId,
      })
      .set("Authorization", `Bearer ${res.body.token}`)
      .expect(201);
  });
});

const request = require("supertest");
const { app } = require("../../../app");

describe("test signup api end point", () => {
  it("returns a 400 with missing checkInDate or checkOutDate", async () => {
    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: "",
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
      })
      .expect(400);
    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: "",
      })
      .expect(400);
  });

  it("returns a 400 with difference btn checkOutDate and checkInDate is less than 24hrs", async () => {
    await request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 20 * 60 * 60 * 1000
        ).toISOString(),
      })
      .expect(400);
  });

  it("returns a 201 on successful adding of booking dates", async () => {
    return request(app)
      .post("/v1/api/booking/add-booking-dates")
      .send({
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        ).toISOString(),
      })
      .expect(201);
  });
});

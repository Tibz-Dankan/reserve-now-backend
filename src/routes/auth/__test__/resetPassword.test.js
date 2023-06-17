const request = require("supertest");
const { app } = require("../../../app");

describe("test the reset-password api end point", () => {
  it("returns 400 with missing token", async () => {
    await request(app)
      .patch(`/v1/api/users/reset-password/:token`)
      .query({ token: "" })
      .send({
        password: "newpassword",
      })
      .expect(400);
  });

  it("returns 400 for an invalid or expired token", async () => {
    await request(app)
      .patch(`/v1/api/users/reset-password/:token`)
      .query({ token: "efefefwfeseedea" })
      .send({
        password: "newpassword",
      })
      .expect(400);
  });

  it("returns 400 if no new password is supplied", async () => {
    await request(app)
      .patch(`/v1/api/users/reset-password/:token`)
      .query({ token: "efefefwfeseedea" })
      .send({
        password: "",
      })
      .expect(400);
  });
});

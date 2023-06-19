const request = require("supertest");
const { app } = require("../../../app");

describe("test updateRoom API endpoint", () => {
  //   it("returns 400 with missing room id", async () => {
  //     const res = await request(app)
  //       .post("/v1/api/users/signup")
  //       .send({
  //         name: "test user",
  //         email: "test@test.com",
  //         password: "password",
  //         country: "country",
  //       })
  //       .expect(201);

  //     await request(app)
  //       .patch("/v1/api/rooms/update-room/:id")
  //       .query({ id: 2 })
  //       .send({
  //         roomNumber: 5,
  //         roomType: "Standard",
  //         capacity: 2,
  //         price: 100,
  //         priceCurrency: "USD",
  //       })
  //       .set("Authorization", `Bearer ${res.body.token}`)
  //       .expect(400);

  //     // await request(app)
  //     //   .patch("/v1/api/rooms/update-room/:id")
  //     //   .query({ id: null })
  //     //   .send({
  //     //     roomNumber: "7",
  //     //     roomType: "Standard",
  //     //     capacity: 2,
  //     //     price: 100,
  //     //     priceCurrency: "USD",
  //     //   })
  //     //   .set("Authorization", `Bearer ${res.body.token}`)
  //     //   .expect(400);
  //   });

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
      .patch("/v1/api/rooms/update-room/:id")
      .query({ id: roomId })
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
      .patch("/v1/api/rooms/update-room/:id")
      .query({ id: roomId })
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
      .patch("/v1/api/rooms/update-room/:id")
      .query({ id: roomId })
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
      .patch("/v1/api/rooms/update-room/:id")
      .query({ id: roomId })
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
    // const addRoomResponse = await request(app)
    //   .post("/v1/api/rooms/add-room")
    //   .send({
    //     roomNumber: "101",
    //     roomType: "Standard",
    //     capacity: 2,
    //     price: 100,
    //     priceCurrency: "USD",
    //   })
    //   .set("Authorization", `Bearer ${signupResponse.body.token}`)
    //   .expect(201);
    // const roomId = addRoomResponse.body.data.id;

    await request(app)
      .patch("/v1/api/rooms/update-room/:id")
      .query({ id: "13" })
      .send({
        roomNumber: 5,
        roomType: "Standard",
        capacity: 2,
        price: 100,
        priceCurrency: "USD",
      })
      .set("Authorization", `Bearer ${signupResponse.body.token}`)
      .expect(400);
  });
});

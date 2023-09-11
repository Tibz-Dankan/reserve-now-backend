class RoomPrice {
  roomArray;

  constructor(roomArray) {
    this.roomArray = roomArray;
  }

  calTotalPrice = (checkInDate, checkOutDate, roomPrice) => {
    if (!checkInDate || !checkOutDate) {
      console.log("Please provide booking dates");
      throw new Error(
        "Sorry, something went wrong on our side, try again later!"
      );
    }
    if (!roomPrice) {
      console.log("Please provide the room price");
      throw new Error(
        "Sorry, something went wrong on our side, try again later!"
      );
    }
    const oneDayMillSec = 1000 * 60 * 60 * 24;
    const checkInMillSec = new Date(checkInDate).getTime();
    const checkOutMillSec = new Date(checkOutDate).getTime();

    const numOfNights = Math.floor(
      (checkOutMillSec - checkInMillSec) / oneDayMillSec
    );
    return numOfNights * roomPrice;
  };

  oneRoom(checkInDate, checkOutDate) {
    /**
     * Returns a room object with property 'totalPrice'
     * Which the total value computed based on the checkIn and checkOut dates
     */
    const price = parseInt(this.roomArray[0].price.amount);
    const totalPrice = this.calTotalPrice(checkInDate, checkOutDate, price);
    const room = this.roomArray[0];
    room.totalPrice = totalPrice;
    return room;
  }
  manyRoom(checkInDate, checkOutDate) {
    /**
     * Returns an array with a room object having an additional property 'totalPrice'
     * Which the total value computed based on the checkIn and checkOut dates
     */
    const rooms = [];
    this.roomArray.map((room) => {
      const currentRoom = room.dataValues;
      console.log("currentRoom", currentRoom);

      const price = parseInt(currentRoom.price.amount);
      const totalPrice = this.calTotalPrice(checkInDate, checkOutDate, price);
      currentRoom.totalPrice = totalPrice;
      rooms.push(currentRoom);
    });
    console.log("rooms with total price", rooms);
    return rooms;
  }
}

module.exports = { RoomPrice };

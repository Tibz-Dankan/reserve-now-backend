const calTotalPrice = (checkInDate, checkOutDate, roomPrice) => {
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

module.exports = { calTotalPrice };

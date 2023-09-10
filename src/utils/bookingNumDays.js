const bookingNumDays = (checkInDate, checkOutDate) => {
  if (!checkInDate || !checkOutDate) {
    console.log("Please provide booking dates");
    throw new Error(
      "Sorry, something went wrong on our side, try again later!"
    );
  }

  const oneDayMillSec = 1000 * 60 * 60 * 24;
  const checkOutMillSec = new Date(checkOutDate).getTime();
  const checkInMillSec = new Date(checkInDate).getTime();

  const numOfDays = Math.floor(
    (checkOutMillSec - checkInMillSec) / oneDayMillSec
  );
  return numOfDays;
};

module.exports = { bookingNumDays };

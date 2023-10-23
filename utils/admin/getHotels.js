const Hotel = require("../../modals/hotel");

function getHotels(request, response) {
    Hotel.find({})
      .then(function (hotels) {
        response.status(200);
        response.send(hotels);
      })
      .catch(function (error) {
        response.status(500);
        console.log(error);
        response.send("An error occurred while fetching the data");
      });
  }

module.exports = getHotels;

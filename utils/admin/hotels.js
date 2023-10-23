const Hotel = require("../../modals/hotel");
console.log("addhotel");
function addhotel (request,response){
    const hotelName = request.body.hotelName;
    const hotelLocation = request.body.hotelLocation;
    const hotelPrice = request.body.hotelPrice;
    const hotelImage1 = request.files;
    const hotelDescription = request.body.hotelDescription;
    const hotelRoom = request.body.hotelRoom;
    const newHotel = {
        hotelName: hotelName,
        hotelLocation: hotelLocation,
        hotelPrice: hotelPrice,
        hotelImage1: hotelImage1[0].filename,
        hotelImage2: hotelImage1[1].filename,
        hotelImage3: hotelImage1[2].filename,
        hotelImage4: hotelImage1[3].filename,
        hotelDescription: hotelDescription,
        hotelRoom: hotelRoom,
    }
    Hotel.create(newHotel)
    .then((hotel) => {
        console.log(hotel);
        response.redirect("/admin");
    })
    .catch((err) => {
        console.log(err);
    })
    

}
module.exports = addhotel;


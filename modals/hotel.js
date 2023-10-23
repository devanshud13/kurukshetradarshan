const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    hotelLocation: {
        type: String,
    },
    hotelPrice: {
        type: Number,
        required: true
    },
    hotelImage1: {
        type: String,
    },
    hotelImage2: {
        type: String,
    },
    hotelImage3: {
        type: String,
    },
    hotelImage4: {
        type: String,
    },
    hotelDescription: {
        type: String,
    },
    hotelRoom: {
        type: Number,
    },
});

const Hotel = mongoose.model("hotel", hotelSchema);

module.exports = Hotel;
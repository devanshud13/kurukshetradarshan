fetch("/getHotels")
.then(function (response) {
    return response.json()
})
.then(function (data) {
    data.forEach(function (hotel) {
        const hotelName = hotel.hotelName;
        const hotelLocation = hotel.hotelLocation;
        const hotelPrice = hotel.hotelPrice;
        const hotelImage1 = hotel.hotelImage1;
        const hotelImage2 = hotel.hotelImage2;
        const hotelImage3 = hotel.hotelImage3;
        const hotelImage4 = hotel.hotelImage4;
        const hotelDescription = hotel.hotelDescription;
        const hotelRoom = hotel.hotelRoom;
        const hotelId = hotel._id;
        const hotelBox = document.getElementById("hotel-box");
        const hotelCard = document.createElement("div");
        hotelCard.innerHTML = 
        `
        <div class="col-md-6 col-sm-6 animate-box">
        <div class="hotel-entry">
            <a href=" /hotelroom?id=${hotelId}" class="hotel-img" style="background-image: url(/${hotelImage1});">
                <p class="price"><span>₹ ${hotelPrice}</span><small> /night</small></p>
            </a>
            <div class="desc">
                <p class="star"><span><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i><i class="icon-star-full"></i></span> 545 Reviews</p>
                <h3><a href=" /hotelroom">${hotelName}</a></h3>
                <span class="place">${hotelLocation}</span>
                <p>${hotelDescription}</p>
            </div>
        </div>
    </div>
    `
    hotelBox.appendChild(hotelCard);
    })
});

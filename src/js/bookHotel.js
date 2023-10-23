const hotelid = document.getElementById("hotelId").innerText;
fetch("/bookHotel")
.then(function (response) {
    return response.json()
})
.then(function (data) {
    data.forEach(function (hotel) {
        if(hotel._id == hotelid){
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
        const hotelContainer = document.getElementById("book-hotel");
        const hotelCard = document.createElement("div");
        hotelCard.innerHTML = 
        `
        <div class="d-flex justify-content-between">
        <div class="d-flex flex-row align-items-center">
            <div>
                <img src="/${hotelImage1}"
                    class="img-fluid rounded-3" alt="Shopping item"
                    style="width: 65px;">
            </div>
            <div class="ms-3">
                <h5>${hotelName}</h5>
                <p class="small mb-0">${hotelLocation}</p>
                <p class="small mb-0"><span>1</span> Night</p>
                <p class="mb-0">
                    <a href="#!" style="color: #cecece;"><i class="fas fa-calendar"></i></a>
                    Thu, 19 Oct - Fri, 20 Oct <span>1</span>room
                    <span>1</span> Guests </p>
                <p class="mb-0">
                    <a href="#!" style="color: #cecece;"><i class="fas fa-door-closed"></i></a>
                    Classic</p>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center">
        </div>
    </div>
        `
    hotelContainer.appendChild(hotelCard);
        }
    }
    )
});
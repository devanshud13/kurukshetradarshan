const hotelid = document.getElementById("hotelId").innerText;
fetch("/showHotel")
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
        const hotelContainer = document.getElementById("hotel-container");
        const hotelCard = document.createElement("div");
        hotelCard.innerHTML = 
        `
        <div class="container">
        <div class="row">
            <div class="col-md-12 animate-box">
                <h3>${hotelName}</h3>
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <a href="/${hotelImage1}" class="thumbnail image-popup">
                            <img src="/${hotelImage1}" alt="Image" class="img-responsive">
                        </a>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <a href="/${hotelImage2}" class="thumbnail image-popup">
                            <img src="/${hotelImage2}" alt="Image" class="img-responsive">
                        </a>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <a href="/${hotelImage3}" class="thumbnail image-popup">
                            <img src="/${hotelImage3}" alt="Image" class="img-responsive">
                        </a>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <a href="/${hotelImage4}" class="thumbnail image-popup">
                            <img src="/${hotelImage4}" alt="Image" class="img-responsive">
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-12 animate-box">
                <h3>Hotel Room Description</h3>
                <p>${hotelDescription}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-10 col-md-offset-1 animate-box">
                <h3>${hotelName}</h3>
                <!-- <form method="post" class="colorlib-form"> -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="no_of_rooms">No. of Rooms</label>
                                <input type="number" id="no_of_rooms" name="no_of_rooms" class="form-control"
                                    placeholder="No. of Rooms">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="no_of_adults">No. of Adults</label>
                                <input type="number" id="no_of_adults" name="no_of_adults" class="form-control"
                                    placeholder="No. of Adults">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="date_from">Date From</label>
                                <input type="date" id="date_from" name="date_from" class="form-control"
                                    placeholder="Date From">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="date_to">Date To</label>
                                <input type="date" id="date_to" name="date_to" class="form-control"
                                    placeholder="Date To">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group text-center">
                                <!-- <input type="submit" id="book-btn" value="Book Now" class="btn btn-primary"> -->
                            </div>
                            <a href="/hotelbook?id=${hotelId}"><button  class="btn btn-primary"> Book Now</button></a>
                        </div>
                    </div>
                <!-- </form> -->
            </div>
        </div>

    </div>
    `
    hotelContainer.appendChild(hotelCard);
        }
    }
    )
});
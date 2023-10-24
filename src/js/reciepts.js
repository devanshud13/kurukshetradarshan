const userName = document.getElementById("userName").innerText;
const userEmail = document.getElementById("userEmail").innerText;
const userPhone = document.getElementById("userPhone").innerText;
const hotelRooms = document.getElementById("hotelRoom").innerText;
const hotelAdults = document.getElementById("hotelAdults").innerText;
const dateFrom = document.getElementById("dateFrom").innerText;
const dateTo = document.getElementById("dateTo").innerText;
const hotelId = document.getElementById("hotelId").innerText;
const hotelPrice = document.getElementById("hotelPrice").innerText;
fetch("/reciepts")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        data.forEach(function (hotel) {
            console.log(hotel._id);
            console.log(hotelId);
            if (hotel._id == hotelId) {
                const hotelName = hotel.hotelName;
                const hotelLocation = hotel.hotelLocation;
                const hotelDescription = hotel.hotelDescription;
                const hotelId = hotel._id;
                const hotelContainer = document.getElementById("reciept-box");
                const hotelCard = document.createElement("div");
                console.log(hotelName);
                function formatteddate(currentDate){
                    const date = new Date(currentDate);
                    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    return formattedDate;
                }
                hotelCard.innerHTML =
                `
                <div class="card">
                <div class="card-header">
                    <h3>Receipt</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Hotel Details</h4>
                            <p>Hotel Name: ${hotelName}</p>
                            <p>Address: ${hotelLocation}</p>
                            <p>Phone: 123-456-7890</p>
                            <p>Email: info@xyzhotel.com</p>
                        </div>
                        <div class="col-md-6">
                            <h4>Booking Details</h4>
                            <p>Booking ID: 123456789</p>
                            <p>Check-in Date: ${formatteddate(dateFrom)}</p>
                            <p>Check-out Date: ${formatteddate(dateTo)}</p>
                            <p>Number of Guests: ${hotelAdults}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-6">
                            <h4>User Details</h4>
                            <p>Name: ${userName}</p>
                            <p>Email: ${userEmail}</p>
                            <p>Phone: ${userPhone}</p>
                        </div>
                        <div class="col-md-6">
                            <h4>Payment Details</h4>
                            <p>Payment Method: Credit Card</p>
                            <p>Card Number: **** **** **** 1234</p>
                            <p>Expiration Date: 01/24</p>
                            <p>CVV: ***</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                        <table class="table">
                        <h4>Payment Details</h4>
                                <thead>
                                    <tr>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Amount Paid</td>
                                        <td>$${hotelRooms*hotelPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <td>$${hotelRooms*(Math.floor(hotelPrice/10))}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>$${hotelRooms*(hotelPrice - Math.floor(hotelPrice/10))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr>
                    <div class="hotel-receipt-instructions">
                        <h4>Things to Remember</h4>
                        <ul>
                            <li>Check-in time is 3:00 PM and check-out time is 12:00 PM.
                            </li>
                            <li>Early check-in and late check-out may be available for an
                                additional fee.</li>
                            <li>A valid credit card is required at check-in for incidentals.
                            </li>
                            <li>A security deposit may also be required.</li>
                            <li>No pets are allowed in the hotel.</li>
                            <li>Smoking is not allowed in the hotel.</li>
                            <li>Please do not disturb the staff after 11:00 PM.</li>
                            <li>For emergency, please call the police at 112.</li>
                            <li>Please keep this receipt for your records.</li>
                        </ul>
                    </div>

                    <div class="row">
                        <div class="col-md-12" id="email-btn">
                            <button class="btn btn-primary" id="screen"
                                onclick="window.print()">Print</button>
                                <form method="POST" action="/confirmation?userEmail=${userEmail}&hotelName=${hotelName}&hotelLocation=${hotelLocation}&hotelRoom=${hotelRooms}&hotelAdults=${hotelAdults}&hotelPrice=${hotelPrice}&dateFrom=${dateFrom}&dateTo=${dateTo}&hotelId=${hotelId}">
                            <button class="btn btn-success" id="email" type="submit">Email</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
                `
                hotelContainer.appendChild(hotelCard);
            }
            else{
                console.log("not found");
            }
        })
    });
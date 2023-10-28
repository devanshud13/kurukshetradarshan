const hotelid = document.getElementById("hotelId").innerText;
const hotelRooms = document.getElementById("hotelRoom").innerText;
const hotelAdults = document.getElementById("hotelAdults").innerText;
const dateFrom = document.getElementById("dateFrom").innerText;
const dateTo = document.getElementById("dateTo").innerText;
fetch("/bookHotel")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        data.forEach(function (hotel) {
            if (hotel._id == hotelid) {
                const hotelName = hotel.hotelName;
                const hotelLocation = hotel.hotelLocation;
                const hotelPrice = hotel.hotelPrice;
                const hotelImage1 = hotel.hotelImage1;
                const hotelImage2 = hotel.hotelImage2;
                let  hotelImage3 = hotel.hotelImage3;
                const hotelImage4 = hotel.hotelImage4;
                const hotelDescription = hotel.hotelDescription;
                const hotelRoom = hotel.hotelRoom;
                const hotelId = hotel._id;
                const hotelContainer = document.getElementById("book-hotel");
                const hotelCard = document.createElement("div");
                function formatteddate(currentDate){
                    const date = new Date(currentDate);
                    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    return formattedDate;
                }
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
                <p class="small mb-0"><span>${dateTo.split('-')[2] - dateFrom.split('-')[2]}</span> Night</p>
                <p class="mb-0">
                    <a href="#!" style="color: #cecece;"><i class="fas fa-calendar"></i></a>
                    ${formatteddate(dateFrom)} - ${formatteddate(dateTo)} <br> <span>${hotelRooms } </span>room
                    <span>${hotelAdults } </span> Guests </p>
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

                const details = document.getElementById("details")
                const hotelCard2 = document.createElement("div");
                hotelCard2.innerHTML =
                    `
    <div class="card-body" >
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h5 class="mb-0">Enter Your details</h5>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
            class="img-fluid rounded-3" style="width: 45px;" alt="Avatar">
    </div>
    <!-- <form class="mt-4" method="POST" id="post-form" action="/reciepts?id=${hotelId}&hotelRoom=${hotelRooms}&hotelAdults=${hotelAdults}&hotelPrice=${hotelPrice}&dateFrom=${dateFrom}&dateTo=${dateTo}">-->
        <div class="form-outline form-white mb-4">
            <input type="text" id="typeName" class="form-control form-control-lg"
                siez="17" placeholder="Full Name" name="userName" required />
            <label class="form-label" for="typeName">Full Name</label>
        </div>

        <div class="form-outline form-white mb-4">
            <input type="text" id="typeEmail" class="form-control form-control-lg"
                siez="17" placeholder="XYZ@gmail.xom" name="userEmail" required />
            <label class="form-label" for="typeText">Email</label>
        </div>
        <div class="form-outline form-white mb-4">
            <input type="text" id="typePhone" class="form-control form-control-lg"
                siez="17" placeholder="+91 12324 15555" name="userPhone" required  />
            <label class="form-label" for="typeText">Mobile Number</label>
        </div>



    <hr class="my-4">

    <div class="d-flex justify-content-between">
        <p class="mb-2">Subtotal</p>
        <p class="mb-2">₹ ${hotelRooms*hotelPrice}</p>
    </div>

    <div class="d-flex justify-content-between">
        <p class="mb-2">Discount</p>
        <p class="mb-2">₹ ${hotelRooms*Math.floor(hotelPrice / 10)}</p>
    </div>

    <div class="d-flex justify-content-between mb-4">
        <p class="mb-2">Total(Incl. taxes)</p>
        <p class="mb-2">₹ ${hotelRooms*(hotelPrice - Math.floor(hotelPrice / 10))}</p>
        
    </div>
    <p>Hurray! you save ₹ ${hotelRooms*Math.floor(hotelPrice / 10)} in your Hotel</p>

    <button class="btn btn-info btn-block btn-lg" type="submit" onclick="handlePayWithInputs('${hotelId}', ${hotelRooms}, ${hotelAdults}, ${hotelPrice}, '${dateFrom}', '${dateTo}','${hotelName}','${hotelImage1}')">
    <div class="d-flex justify-content-between">
      <span>₹ ${hotelRooms*(hotelPrice - Math.floor(hotelPrice / 10))}</span>
      <span >Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
    </div>
  </button>
    <!-- </form> -->

</div>
    `
                details.appendChild(hotelCard2);
            }
        })
    });

    function handlePayWithInputs(hotelId,hotelRooms,hotelAdults,hotelPrice,dateFrom,dateTo,hotelName,hotelImage1) {
        const typeName = document.getElementById('typeName').value;
        const typeEmail = document.getElementById('typeEmail').value;
        const typePhone = document.getElementById('typePhone').value;
        console.log(hotelImage1)
        handlepay(hotelId,hotelRooms,hotelAdults,hotelPrice,dateFrom,dateTo, typeName, typeEmail, typePhone,hotelName,hotelImage1);
      }
 function handlepay(hotelId,hotelRooms,hotelAdults,hotelPrice,dateFrom,dateTo,userName,userEmail,userPhone,hotelName,hotelImage1){
    const formData = new FormData();
formData.append('hotelId', '8f9a94e3179ad7c910e733eb5da2e318');
formData.append('fullName', 'John Doe');
formData.append('email', 'johndoe@example.com');
formData.append('phone', '1234567890');
fetch('/createOrder', {
        method: 'POST',
        body: formData
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          if (res.success) {
            var options = {
              "key": "" + res.key_id + "",
              "amount": "100",
              "currency": "INR",
              "name": hotelName,
              "description": "hotelDescription" ,
              "image": hotelImage1,
              "order_id": "" + res.order_id + "",
              "handler": function (response) {
                handlereciept(hotelId, hotelRooms, hotelAdults, hotelPrice, dateFrom, dateTo,userName,userEmail,userPhone)
              },
              "prefill": {
                "contact": userPhone,
                "name": userName,
                "email": userEmail
              },
              "notes": {
                "description": "" + res.description + ""
              },
              "theme": {
                "color": "#2300a3"
              }
            };
            var razorpayObject = new Razorpay(options);
            razorpayObject.on('payment.failed', function (response) {
              alert("Payment Failed");
            });
            razorpayObject.open();
          }
          else {
            alert(res.msg);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    function handlereciept(hotelId, hotelRooms, hotelAdults, hotelPrice, dateFrom, dateTo,userName,userEmail,userPhone){
        const url = `/reciepts?id=${hotelId}&hotelRoom=${hotelRooms}&hotelAdults=${hotelAdults}&hotelPrice=${hotelPrice}&dateFrom=${dateFrom}&dateTo=${dateTo}&userName=${userName}&userEmail=${userEmail}&userPhone=${userPhone}`;

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // Add any additional data that you want to send in the request body
          })
        })
        .then(response => {
          if (response.ok) {
            const url = `/reciept?id=${hotelId}&hotelRoom=${hotelRooms}&hotelAdults=${hotelAdults}&hotelPrice=${hotelPrice}&dateFrom=${dateFrom}&dateTo=${dateTo}&userName=${userName}&userEmail=${userEmail}&userPhone=${userPhone}`;
            window.location.href = url;
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
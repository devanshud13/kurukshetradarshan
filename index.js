const express = require('express');
const signup = require("./utils/authentication/signup");
const login = require("./utils/authentication/login");
const logout = require("./utils/authentication/logout");
const connect = require('./modals/database');
const hotels = require("./utils/admin/hotels");
const getHotels = require("./utils/admin/getHotels");
const bookHotels = require("./utils/admin/showHotels");
const reciepts = require("./utils/admin/showHotels");
const User = require("./modals/user");
const Hotel = require("./modals/hotel");
const app = express();
var session = require('express-session')
const multer = require('multer');
const showHotels = require('./utils/admin/showHotels');
const confirmation = require('./utils/email/confirmation');
const paymentController = require('./utils/payment/paymentController');
const upload = multer({ dest: 'uploads/' })
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(function (req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))
app.use(upload.array('hotelImage1', 4));
app.use(express.static("src"));
app.use(express.static("src/images"));
app.use(express.static("src/css"));
app.use(express.static("src/js"));
app.use(express.static("src/fonts"));
app.use(express.static("src/components"));
app.use(express.static("src/scss"));
app.use(express.static("uploads"));
app.set("view engine", "ejs");
app.get('/', function(request,response){
    const user = request.session.username;
    if(request.session.isLoggedIn){
       User.findOne({ username: user })
    .then((user) => {
        if (user) {
            request.session.id = user._id;
            response.render('index',{username: user.username,id: user._id});
        } else {
            response.send("user not found");
        }
    })
    }else{
        response.render("index",{username: null,id: null});
    }
})
app.get("/about", function (request, response) {
    response.render("about", { username: request.session.username });
});
app.get("/blog", function (request, response) {
    response.render("blog", { username: request.session.username });
});
app.get("/hotels", function (request, response) {
    response.render("hotels", { username: request.session.username });
});
app.get("/services", function (request, response) {
    response.render("services", { username: request.session.username });
});
app.get("/test", function (request, response) {
    response.render("test"  , { username: request.session.username });
});
app.get("/testticket", function (request, response) {
    response.render("testticket", { username: request.session.username });
});
app.get("/ticket", function (request, response) {
    response.render("ticket", { username: request.session.username });
});
app.get("/contact", function (request, response) {
    response.render("contact", { username: request.session.username });
});
app.get("/hotelroom", function (request, response) {
    response.render("hotelroom", { username: request.session.username, id: request.query.id });
});
// app.get("/hotelbook", function (request, response) {
//     response.render("hotelbook", { username: request.session.username, id: request.query.id });
// });
app.post("/hotelbook", function (request, response) {
    const hotelRoom = request.body.hotelRoom;
    const hotelAdults = request.body.hotelAdults;
    const dateFrom = request.body.dateFrom;
    const dateTo = request.body.dateTo;

    response.render("hotelbook", { username: request.session.username, id: request.query.id, hotelRoom: hotelRoom, hotelAdults: hotelAdults, dateFrom: dateFrom, dateTo: dateTo });
});
app.post("/reciepts", function (request, response) {
    const userName = request.body.userName;
    const userEmail = request.body.userEmail;
    const userPhone = request.body.userPhone;
    const hotelRoom = request.query.hotelRoom;
    const hotelAdults = request.query.hotelAdults;
    const dateFrom = request.query.dateFrom;
    const dateTo = request.query.dateTo;
    const hotelPrice = request.query.hotelPrice;
    response.render("reciept", { username: request.session.username, id: request.query.id, hotelRoom: hotelRoom, hotelAdults: hotelAdults, dateFrom: dateFrom, dateTo: dateTo, userName: userName, userEmail: userEmail, userPhone: userPhone, hotelPrice: hotelPrice })
})
app.get("/reciept", function (request, response) {
    const userName = request.query.userName;
    const userEmail = request.query.userEmail;
    const userPhone = request.query.userPhone;
    const hotelRoom = request.query.hotelRoom;
    const hotelAdults = request.query.hotelAdults;
    const dateFrom = request.query.dateFrom;
    const dateTo = request.query.dateTo;
    const hotelPrice = request.query.hotelPrice;
    response.render("reciept", { username: request.session.username, id: request.query.id, hotelRoom: hotelRoom, hotelAdults: hotelAdults, dateFrom: dateFrom, dateTo: dateTo, userName: userName, userEmail: userEmail, userPhone: userPhone, hotelPrice: hotelPrice })
});
app.get("/admin",function (request, response) {
    response.render("admin", { username: request.session.username });
});
app.get("/login", function (request, response) {
    const user = request.session.usernotfound;
    request.session.usernotfound = false;
    if (request.session.isLoggedIn) {
        response.redirect("login", { username: request.session.username });
        return;
    } else {
        response.render('login', { username: request.session.username, usernotfound: user });
    }
})
app.post("/confirmation", function (request, response) {
    const userEmail = request.query.userEmail;
    const dateFrom = request.query.dateFrom;
    const dateTo = request.query.dateTo;
    const hotelAdults = request.query.hotelAdults;
    const hotelPrice = request.query.hotelPrice;
    const hotelName = request.query.hotelName;
    const hotelLocation = request.query.hotelLocation;
    const subject = "Booking Confirmation";

    const html = `
    <h1>KURUKSHETRA DARSHAN </h1>
    <h1>Thank you for booking with us</h1>
    <p>Booking Details</p>
    <p>Hotel Name: ${hotelName}</p>
    <p>Address: ${hotelLocation}</p>
    <p>Check-in Date: ${dateFrom}</p>
    <p>Check-out Date: ${dateTo}</p>
    <p>Number of Guests: ${hotelAdults} Adults</p>
    <p>Total Amount:₹ ${hotelAdults*hotelPrice}</p>
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
        <li>For assistance, please call the front desk at [phone
            number].</li>
        <li>Please keep this receipt for your records.</li>
    </ul>
    
    `
    confirmation(subject,userEmail,html);
    // response.render("reciept", { username: request.session.username, id: null, hotelRoom: null, hotelAdults: null, dateFrom: null, dateTo: null, userName: null, userEmail: null, userPhone: null, hotelPrice: null })
    response.render("hotels", { username: request.session.username });
});
app.get("/signup", function (request, response) {
    const Email = request.session.email;
    request.session.email = null;
    if (request.session.isLoggedIn) {
        response.redirect("signup", { username: request.session.username });
    } else {
        response.render("signup", { username: request.session.username, email: Email });
    }
})
app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.post("/addHotel",hotels);
app.get("/getHotels",getHotels);
app.get("/showHotel",showHotels);
app.get("/bookHotel",bookHotels);
app.get("/reciepts",reciepts);
app.post("/createOrder", paymentController.createOrder);
connect();
app.listen(8080, () => console.log(`Example app listening on port 8080`))
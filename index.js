const express = require('express');
const signup = require("./utils/authentication/signup");
const login = require("./utils/authentication/login");
const logout = require("./utils/authentication/logout");
const connect = require('./modals/database');
const hotels = require("./utils/admin/hotels");
const getHotels = require("./utils/admin/getHotels");
const User = require("./modals/user");
const app = express();
var session = require('express-session')
const multer = require('multer');
const showHotels = require('./utils/admin/showHotels');
const upload = multer({ dest: 'uploads/' })
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
    request.session.id = request.query.id;
    response.render("hotelroom", { username: request.session.username, id: request.query.id });
});
app.get("/hotelbook", function (request, response) {
    response.render("hotelbook", { username: request.session.username });
});
app.get("/reciept", function (request, response) {
    response.render("reciept", { username: request.session.username });
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
app.get("/showHotel",showHotels)
connect();
app.listen(8080, () => console.log(`Example app listening on port 8080`))
const express = require('express');
const app = express();
var session = require('express-session')
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
app.use(express.static("src"));
app.use(express.static("src/images"));
app.use(express.static("src/css"));
app.use(express.static("src/js"));
app.set("view engine", "ejs");
app.get('/',function (request, response){
    response.render('index');
})
app.get("/about", function (request, response) {
    response.render("about");
});
app.get("/blog", function (request, response) {
    response.render("blog");
});
app.get("/hotels", function (request, response) {
    response.render("hotels");
});
app.get("/services", function (request, response) {
    response.render("services");
});
app.get("/test", function (request, response) {
    response.render("test");
});
app.get("/testticket", function (request, response) {
    response.render("testticket");
});
app.get("/ticket", function (request, response) {
    response.render("ticket");
});
app.get("/contact", function (request, response) {
    response.render("contact");
});

app.listen(8080, () => console.log(`Example app listening on port 8080`))
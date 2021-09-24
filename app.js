require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const ejs = require('ejs');
const _ = require("lodash");
const session = require('express-session');
const passport = require('passport');
const helmet = require("helmet");
const compression = require("compression");

const app = express();

app.use(
    helmet({
      contentSecurityPolicy: false
    })
);

const todoRoutes = require("./routes/todo");
const authRoutes = require("./routes/auth");
const errorPage = require("./routes/404error");


app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(compression());

app.use(session({
    secret: process.env.SECRET,
    cookie: {maxAge: 500000000},
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true } use only when https request 
  }));

app.use(passport.initialize()); // to initilize passport
app.use(passport.session()); // use passport deal with sessions

const User = require("./models/user");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(todoRoutes);
app.use(authRoutes);
app.use(errorPage);


let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

const localUrl = `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}`;
const cloudUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.p5qv8.mongodb.net/${process.env.MONGO_DB_NAME}`;

mongoose.connect(cloudUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

    }).then(result => {
    app.listen(port, function(){
        console.log("server running in port 3000");
    });
    }).catch(err => {
    console.log(err);
});

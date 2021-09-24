const passport = require('passport');

const expressValidator = require("express-validator");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "login",
        message: ""
    });
}

exports.postLogin = (req, res, next) => {

    const errors = expressValidator.validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).render("auth/login", {
            pageTitle: "login",
            message: errors.array()[0].msg
        });
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password 
     });
 
     req.login(user, function(err){
         if(err){
             console.log(err);
         }
         else{
             passport.authenticate("local", function(err, user, info){
                if(err){
                    console.log(err);
                }
                if(!user){
                    console.log(info);
                    const msg = Object.values(info)[1];
                    res.render("auth/login", {
                        pageTitle: "login",
                        message: msg
                    });
                }
                else{
                    res.redirect("/");
                }
             })(req, res); 
         }
     })
}

exports.getRegister = (req, res, next) => {
    res.render("auth/register", {
        pageTitle: "sign up",
        message: ""
    });
}

exports.postRegister = (req, res, next) => {

    const errors = expressValidator.validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).render("auth/register", {
            pageTitle: "sign up",
            message: errors.array()[0].msg
        });
    }

    User.register({username: req.body.username}, req.body.password)
        .then(user => {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        })
        .catch(err => {
            console.log(Object.values(err));
            const error = Object.values(err)[1];
            res.render("auth/register", {
                pageTitle: "sign up",
                message: error
            });
        });

    // User.register({username: req.body.username}, req.body.password, function(err, user){
    //     if(err){
    //         const error = Object.values(err)[1];
    //         console.log(error);
    //         res.render("register", {message: error});
    //     }
    //     else{
    //         passport.authenticate("local")(req, res, function(){
    //             res.redirect("/");
    //         });
    //     }
    // });
}

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect("/login");
}
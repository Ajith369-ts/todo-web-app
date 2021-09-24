const express = require("express");

const router = express.Router();

const expressValidator = require("express-validator");

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);

router.post("/login", [
    expressValidator.body("username", "Enter a valid input.")
    .isLength({min: 1}),
    
    expressValidator.body("password", "Enter a valid input.")
    .isLength({min: 1})
    .trim()
], authController.postLogin);

router.get("/register", authController.getRegister);

router.post("/register", [
    expressValidator.body("username")
    .isLength({min: 3})
    .withMessage("Username should not be empty and be min 3 characters"),
    
    expressValidator.body("password")
    .isLength({min: 6})
    .withMessage("password must be atleast 6 digit")
    .trim()
], authController.postRegister);

router.get("/logout", authController.getLogout);

module.exports = router;
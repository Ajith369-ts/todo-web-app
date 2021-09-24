
const mongoose = require("mongoose");

const encrypt = require('mongoose-encryption');

const passportLocalMongoose = require('passport-local-mongoose'); 

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    items: Array
});

const secret = process.env.KEY;
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["items"] });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
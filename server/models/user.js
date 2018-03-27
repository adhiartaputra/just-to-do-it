const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    name: String,
    profilImg: String,
    facebookId: String
});

const User = mongoose.model('User', userSchema)

module.exports = User;
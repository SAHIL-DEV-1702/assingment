const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: String,
    username: String,
    email: String,
});

module.exports = mongoose.model("User", UserSchema);

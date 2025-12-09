const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    userId: Number,
    title: String,
    body: String,
});

module.exports = mongoose.model("Post", PostSchema);

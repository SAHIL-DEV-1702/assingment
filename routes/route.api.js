const express = require("express");
const router = express.Router();
const axios = require("axios");
const Post = require("../model/Post.model");
const User = require("../model/User.model");

router.get("/fetch-data", async (req, res) => {
    try {
        const postsResponse = await axios.get("https://jsonplaceholder.typicode.com/posts", { timeout: 5000 });
        const usersResponse = await axios.get("https://jsonplaceholder.typicode.com/users", { timeout: 5000 });


        for (const user of usersResponse.data) {
            await User.updateOne({ id: user.id }, user, { upsert: true });
        }


        for (const post of postsResponse.data) {
            await Post.updateOne({ id: post.id }, post, { upsert: true });
        }

        res.json({ message: "Data fetched and cached successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


router.get("/posts", async (req, res) => {
    try {
        const filter = {};
        if (req.query.userId) filter.userId = Number(req.query.userId);

        const posts = await Post.find(filter);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});


router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ id: Number(req.params.id) });
        if (!post) return res.status(404).json({ error: "Post not found" });

        const user = await User.findOne({ id: post.userId });
        res.json({ post, user });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
});

module.exports = router;

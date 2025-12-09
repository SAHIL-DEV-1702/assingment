const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/route.api.js");

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/api_assignment")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(" MongoDB connection error:", err));

app.use(express.json());


app.use("/api", apiRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

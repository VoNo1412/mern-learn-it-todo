const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./resources/data/db");
const dotenv = require("dotenv").config();
const RouterAuth = require('./resources/router/auth');
const RouterPost = require("./resources/router/post");
const cors = require('cors')
db.connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/auth", RouterAuth)
app.use("/api/posts", RouterPost)
app.listen(PORT, () => console.log("Server is running: ", PORT));
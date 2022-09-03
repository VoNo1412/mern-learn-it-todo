const express = require('express');
const PostController = require('../controllers/PostController');
const Router = express.Router();
const verifyToken = require("../middleware/index");

Router.put("/post/:id",verifyToken, PostController.update);
Router.post("/post",verifyToken, PostController.insert);
Router.delete("/post/:id",verifyToken, PostController.delete);
Router.get("/",verifyToken, PostController.index);

module.exports = Router;
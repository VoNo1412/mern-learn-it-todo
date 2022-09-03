const express = require('express');
const AuthController = require('../controllers/AuthController');
const Router = express.Router();
const verifyToken = require('../middleware/index');

// check if user logged in
Router.get('/', verifyToken, AuthController.checkUser)

Router.post("/register", AuthController.register);
Router.post("/login", AuthController.login);

module.exports = Router;
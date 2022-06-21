const express = require('express');
const {httpAddNewUser,httpGetAllUser,httpLogin}=require('./user.controller');
const {addNewDataValid,validates} = require('../services/validation');
const {auth}= require('../service/auth');
const usersRouter = express.Router();

usersRouter.post('/',addNewDataValid(),validates,httpAddNewUser) // Create a new user
usersRouter.get('/', auth, httpGetAllUser) // To get all user 
usersRouter.post('/login',httpLogin) // Login Api for user
module.exports = usersRouter
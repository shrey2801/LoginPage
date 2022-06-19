const express = require('express');
const {httpAddNewUser,httpGetAllUser,httpLogin}=require('./user.controller');
const {addNewDataValid,validates} = require('../services/validation');
const {auth}= require('../service/auth');
const usersRouter = express.Router();

usersRouter.post('/',addNewDataValid(),validates,httpAddNewUser)
usersRouter.get('/', auth, httpGetAllUser)
usersRouter.post('/login',httpLogin)
module.exports = usersRouter
const express = require('express');
const {auth} = require('../service/auth');

const {httpNewPost,getAllPost,likeDislike} = require('./post.controller');
const {putValidation,validates} = require('../services/validation');
const postRouters = express.Router();

postRouters.put('/',putValidation(),validates,auth,httpNewPost);
postRouters.get('/post',auth,getAllPost);
postRouters.get('/likeDislike',auth,likeDislike)
module.exports = postRouters
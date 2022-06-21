const express = require('express');
const {auth} = require('../service/auth');

const {httpNewPost,getAllPost,likeDislike} = require('./post.controller');
const {putValidation,validates} = require('../services/validation');
const postRouters = express.Router();

postRouters.put('/',putValidation(),validates,auth,httpNewPost); // Create new post
postRouters.get('/post',auth,getAllPost); // To get all post of user
postRouters.get('/likeDislike',auth,likeDislike) // For likeDislike Api
module.exports = postRouters
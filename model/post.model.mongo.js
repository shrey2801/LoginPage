const mongoose = require('mongoose');
const userDataBase = require('./user.model.mongo');

const postSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userData'
        
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userData',
        required:true

    }],
    dislike:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userData',
        required:true
    }]

},{timestamps:true});

const postDataBase = new mongoose.model('post',postSchema);
module.exports = postDataBase
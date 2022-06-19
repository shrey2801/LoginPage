const postDataBase = require('./post.model.mongo');
const mongoose = require('mongoose');
const userModel = require('./user.model');

async function saveData(post){
     await postDataBase.insertMany(post)
}
// Creating New Post
async function createNewPost(post){
    return await saveData(post)
}

async function existPostIdCheck(id){

    return mongoose.isValidObjectId(id) && await postDataBase.findById(id);
}

async function getPost(post,skip,limit,key,value){
    const existPost = await postDataBase.find({}).skip(skip).limit(limit).sort({[key]:value}).populate({path:'userId', select:['firstName','lastName']})
    return existPost
}
// For Update post
async function updatePostData(id,updateBody){
    const checkExistPost = await existPostIdCheck(updateBody.id);

    const update = await postDataBase.updateOne({_id:id},{
        userId:updateBody.userId,
        title:updateBody.title,
        content:updateBody.content,
    });
    return update
}

async function like(postId,userId){
    await postDataBase.updateOne({_id:postId},{
        $push:{likes:userId},
        $pull:{dislike:userId}
    })
}

async function disLike(postId,userId){
    await postDataBase.updateOne({_id:postId},{
        $push:{dislike:userId},
        $pull:{likes:userId}
        
    })
}

async function likePostChek(postId,userId){
    return await postDataBase.findOne({_id:postId,likes:{$in:userId}}) 
}


async function disLikePostChek(postId,userId){
    return await postDataBase.findOne({_id:postId,dislike:{$in:userId}}) 
}
module.exports = {
    createNewPost,
    existPostIdCheck,
    getPost,
    updatePostData,
    like,
    disLike,
    likePostChek,
    disLikePostChek

}
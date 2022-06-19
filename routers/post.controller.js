const { response } = require('express');
const { createNewPost,existPostIdCheck,getPost,updatePostData,like,disLike,likePostChek,disLikePostChek} = require('../model/post.model');
const { pagination }  = require('../service/query');
const postDataBase = require('../model/post.model.mongo');


//TO add new Post or Exixt then Update Post
async function httpNewPost(req,res){
    const postBodyPart = req.body
    const id = req.body._id;

    let postId = req.authId
    //console.log(postId);
    req.body.userId = postId
    
    if(id)
    {
        const existPost = await existPostIdCheck(id);
        
        if(existPost)
        {
            if(existPost.userId == postId)
            {
                await updatePostData(id,postBodyPart);
                return res.status(200).json({sucess:"Post Update Successfully"})
            }
            else
            {
                res.status(400).json({error:"Update not possible"})
            }
        }
        else
        {
            res.status(400).json({error:"Post not Valid"})
        }
    }
    else
    {
        //postBodyPart.userId=postId
        await createNewPost(postBodyPart);
        return res.status(200).json({sucess:"post created"})
    }
    
}
// Get All post
async function getAllPost(req,res){
    const postBodyPart = req.query;

    const userKey = req.query.key;
    const userValue = req.query.value;
    const {skip,limit} = pagination(req.query)
    await getPost(postBodyPart)
    return res.status(200).json(await getPost(postBodyPart,skip,limit,userKey,userValue))
}
//For  Like and DisLike
async function likeDislike(req,res){
    const action = req.query.action;
    const lId = req.body.id;

    const uId = req.authId

    if(existPostIdCheck(lId))
    {
        if(action == 'like')
        {
            if(!await likePostChek(lId,uId))
            {
                await like(lId,uId)
                return res.status(200).json({sucess:"post Liked"})
            }
            else 
            {
                return res.status(400).json({error:'Post Already liked'})
            }
        }
        else if (action == 'dislike')
        {
            if(!await disLikePostChek(lId,uId))
            {
                await disLike(lId,uId)
                return res.status(200).json({sucess:"post DisLiked"})
            }
            else
            {
                return res.status(400).json({error:'Post Already Disliked'})
            }
        }
    }
}

module.exports = {
    httpNewPost,
    getAllPost,
    likeDislike
}
const {getAllUser,loginUser,hashPassword,registerNewUser,userMailCheck,generateJwtToken}=require('../model/user.model');
const userDataBase = require('../model/user.model.mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pagination }  = require('../service/query');


//to add new user or register
async function httpAddNewUser(req,res){
    const userBodyPart = req.body;
    
    await registerNewUser(userBodyPart);

    return res.status(201).json({
        success:"User Registered"
    });
}

// get All user 
async function httpGetAllUser(req,res){
    const {skip,limit} = pagination(req.query)

    const userKey = req.query.key;
    const userValue = req.query.value;
    const allUser = await getAllUser(skip,limit,userKey,userValue)
    return res.status(200).json(allUser)
}

// Login 
async function httpLogin(req,res){
    const userData = await userMailCheck(req.body.email);
    const userPassword  = req.body.password;
    
    if(userData) {
        const verifyUserDetail = await loginUser(userPassword,userData);
        const data = await userDataBase.findOne({email: req.body.email })
        //console.log(data)
        const token = await generateJwtToken(data._id)
       // console.log(token)
        return res.status(200).json({
            success:"Login Successfully",
            token: token
        })
    }
    else {
        return res.status(400).json({
            Error:"Invalid details"
        })
    }
}

module.exports = {
    httpAddNewUser,
    httpGetAllUser,
    httpLogin
    
}
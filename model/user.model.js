const userDataBase = require('./user.model.mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function createUser(userData){
    userData.password = await hashPassword(userData.password);
    await userDataBase.insertMany(userData);
}

// Hash Password
async function hashPassword(userData){
    const salt = await bcrypt.genSalt(10)
    return userData.password = await bcrypt.hash(userData,salt)

}

// For Generate JWT token
async function generateJwtToken(userId){
    const token = jwt.sign({_id:userId},"ShreyPatel", {expiresIn: '24 hours'})
   // console.log(token)
    return token;
}

// Verify JWT Token
async function verifyJwtToken(token){
    if(token){
        const jwtToken = jwt.verify(token,"ShreyPatel")
        return jwtToken
    }
    else{
        console.log("Error in verify Tocken");
    }

}
// Registe new User
async function registerNewUser(userData){
    return await createUser(userData)
}

// For Login
async function loginUser(password,userData){
    return await bcrypt.compare(password,userData.password);
}

async function userMailCheck(email){
    return await userDataBase.findOne({email})
}

// Get All user
async function getAllUser(skip,limit,key,value){
    return await userDataBase.find({},{'__v':0,'password':0})
    .sort({[key]:value})
    .skip(skip)
    .limit(limit)
}

module.exports = {
    getAllUser,
    hashPassword,
    loginUser,
    registerNewUser,
    userMailCheck,
    generateJwtToken,
    verifyJwtToken
    
}
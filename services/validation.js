const {check ,body, validationResult} = require('express-validator');
const {userMailCheck} = require('../model/user.model')

// Validation for New Register
const addNewDataValid = () => {
    return[

        body('firstName').notEmpty().withMessage("Invalid First Name").isAlpha(),
        body('lastName').notEmpty().withMessage("Invalid Last Name").isAlpha(),
        body('email').isEmail().withMessage("message:'Invalid Email").custom(userEmailCheck),
        body('dob').isDate().withMessage("Invalid Date").custom(datevalid),
    
    ]
}

const updateDataValid = () => {
    return[
        body('firstName').optional().notEmpty().withMessage("Invalid First Name").isAlpha(),
        body('lastName').optional().notEmpty().withMessage("Invalid Last Name").isAlpha(),
        body('email').optional().isEmail().withMessage("Invalid Email").custom(userEmailCheck),
        body('dob').optional().isDate().withMessage("Invalid Date").custom(datevalid)
    ]
}

// Validation for Title and Content
const putValidation = () => {
    return[
        body('title').notEmpty().withMessage("Invalid Title Format").isAlpha(),
        body('content').notEmpty().withMessage("Invalid Content Format").isAlpha()
    ]
}

async function userEmailCheck(value){
    if(!await userMailCheck(value)){
        return true
    }
    throw new Error("Email Id already exist");
}

 function userEmailValidation(){
     const users = [
         check('email',"User not Availabe").isMongoId().custom(userEmailCheck)
     ]
     return users;
 }


const datevalid = (dt) => {
    let current = new Date();
    let getDateByUser = new Date(dt);
    let d = 24 * 60 * 60 *1000 // hour * min * sec * mili

    let diffrent = (current - getDateByUser);
    //console.log(diffrent);
    diffrent = Math.ceil(diffrent / d);
    //console.log(diffrent);
    diffrent = Math.abs(Math.round(diffrent/365));
    //console.log(diffrent);
    if (diffrent >= 15) 
    {
        return true;
    }
    else
    {
        throw new Error('Age not valid');
    }
}

const validates = (req,res,next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    return res.status(422).json({
        errors:errors.array(),
    })
}

module.exports = {
    addNewDataValid,
    updateDataValid,
    validates,
    userEmailValidation,
    putValidation
    
}
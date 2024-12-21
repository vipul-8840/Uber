const userModel = require("../models/user.models");
const {validationResult}= require('express-validator');
const userService = require("../services/user.service");

const BlacklistTokenModel = require("../models/BlacklistToken.model");


module.exports.registerUser =  async (req,res,next)=>
{
    const errors = validationResult(req.body);
    if(!errors.isEmpty())
    {
       return res.status(400).json({errors:errors.array()})
    }


    const { fullname,email,password}=req.body;
   

    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist)
    {
        return res.status(400).json({message:"User already exists"})
    }
    const hashedpassword = await userModel.hashPassword(password);
    console.log(hashedpassword)
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword 
    })

    const token = user.generateAuthToken();
  res.status(201).json ({user,token});

}


module.exports.loginUser = async (req,res,next)=>
{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
       return res.status(400).json({errors:errors.array()})
    }


    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user)
    {
        return  res.status(401).json({message:"invalid email or password"})
       
    }
     const isMatch = await  user.comparePassword (password);
     console.log(isMatch)
     if(!isMatch)
        {
            return  res.status(401).json({message:"invalid email or password"})
            
        }
         

        const token = user.generateAuthToken();

        res.cookie('token',token);
  res.status(201).json ({user,token});

    
}


module.exports.getUserProfile = async(req,res,next)=>
{
     res.status(200).json(req.user)
}
module.exports.logoutUser = async (req,res,next)=>
{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlacklistTokenModel.create({token});

    res.status(200).json({message:"Logged Out"})
}

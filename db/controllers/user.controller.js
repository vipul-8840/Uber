const userModel = require("../models/user.models");
const {validationResult}= require('express-validator');
const userService = require("../services/user.service");


module.exports.registerUser =  async (req,res,next)=>
{
    const errors = validationResult(req.body);
    if(!errors.isEmpty())
    {
       return res.status(400).json({errors:errors.array()})
    }


    const { fullname,email,password}=req.body;
    console.log(req.body);
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
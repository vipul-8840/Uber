const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult}= require("express-validator");

module.exports.registerCaptain = async (req,res,next)=>
{
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password,fullname,vehicle}=req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist)
    {
        return res.status(400).json({mssg:"Captain already exists"});
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        email,
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        password:hashedPassword,
        color:vehicle.color,
        capacity:vehicle.capacity,
        plate:vehicle.plate,
        vehicleType:vehicle.vehicleType
     
   
    });

    const token = captain.generateAuthToken();
    res.status(200).json({captain,token});
}
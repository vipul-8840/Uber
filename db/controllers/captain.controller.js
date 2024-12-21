const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult}= require("express-validator");
const BlacklistTokenModel = require("../models/blacklistToken.model");



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

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword (password);
    console.log(isMatch)

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid  password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req,res,next)=>{
    const captain = req.captain;
    res.status(200).json({captain});
}
module.exports.logoutCaptain = async (req,res,next)=>{

        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    
        await BlacklistTokenModel.create({token});
        res.clearCookie('token');
    
        res.status(200).json({message:"Logged Out"})
}

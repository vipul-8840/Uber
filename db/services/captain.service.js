const captainModel = require("../models/captain.model");

module.exports.createCaptain=  async({
    email,password,firstname,lastname,color,plate,capacity,vehicleType,
})=>
    
    {


  if(!email || !password || !firstname|| !color || !plate || !capacity || !vehicleType)
  {
        throw new Error("All fields are required");
  }
  const captain =  captainModel.create({
        email,
        password,
        fullname:{
            firstname,
            lastname
        },
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;
}
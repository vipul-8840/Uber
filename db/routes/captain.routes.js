const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const { body } = require("express-validator");




router.post("/register",[body("email").isEmail().withMessage("Invalid email"),
body("password").isLength({min:6}).withMessage("password must be atleast 5 characters long"),
body("fullname.firstname").isLength({min:3}).withMessage("firstname must be atleast 3 characters long"),
body('vehicle.color').isLength({min:3}).withMessage("color must be atleast 3 characters long"),
body('vehicle.plate').isLength({min:3}).withMessage("plate must be atleast 3 characters long"),
body('vehicle.capacity').isInt(1).withMessage("capacity must be atleast 1"),
body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage("vehicle type must be car,bike or auto"),

],captainController.registerCaptain);



module.exports=router;
const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const { body } = require("express-validator");
const authMiddleware= require("../controllers/middlewares/auth.middlewares");




router.post("/register",[body("email").isEmail().withMessage("Invalid email"),
body("password").isLength({min:6}).withMessage("password must be atleast 6 characters long"),
body("fullname.firstname").isLength({min:3}).withMessage("firstname must be atleast 3 characters long"),
body('vehicle.color').isLength({min:3}).withMessage("color must be atleast 3 characters long"),
body('vehicle.plate').isLength({min:3}).withMessage("plate must be atleast 3 characters long"),
body('vehicle.capacity').isInt(1).withMessage("capacity must be atleast 1"),
body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage("vehicle type must be car,bike or auto"),

],captainController.registerCaptain);

router.post('/login',
    [body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("password must be atleast 6 characters long")],
    captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain ,captainController.getCaptainProfile);

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports=router;
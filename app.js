
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./db/routes/user.routes");
const app = express();

connectToDb();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))




app.get("/",function (req,res)
{
    res.json({
        mssg:"user connected"
    })
})
app.use('/users',userRoutes);
module.exports = app;
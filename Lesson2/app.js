// Hashing Password
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const md5 = require('md5');
const User = require("./Models/userModel");
const app = express();

const PORT = process.env.PORT || 3002;
const dbURL = process.env.DB_URL;

mongoose.connect(dbURL)
.then(()=>{
    console.log("mongoDb Atlas is connected");
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/register", async (req,res)=>{
    try{
        const newUser = new User({
            email: req.body.email,
            password: md5(req.body.password)
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch(error){
        res.status(500).json(error.message);
    }
});

app.post("/login", async (req,res)=>{
    try{
        const email = req.body.email;
        const password = md5(req.body.password);
        const user = await User.findOne({email: email});
        if(user && user.password === password){
            res.status(200).json({status:"Valid user"});
        } else {
            res.status(404).json({status:"Not valid user"});
        }
    } catch(error){
        res.status(500).json(error.message);
    }
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/./Views/index.html")
})

// route not found error
app.use((req,res,next)=>{
    res.status(404).json({
        message:"route not found"
    });
});

// handling server error
app.use((err, req, res, next)=>{
    res.status(500).json({
        message:"something broke"
    });
});


app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})
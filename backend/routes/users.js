const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var JWT_SECRECT = "This@isasecretsente$nce";
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

//Create user. No login required.
router.post("/createUser", [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be atleast 5 characters long').isLength({ min: 5 })
    ] , async(req, res) => {
    let success = false;
    //Validate all the parameters in req and if any error is found then throw it.
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array() });
    }
    //No validation errors found.
    try{
        //Now, check whether the user is unique or not.
        let user = await Users.findOne({email: req.body.email});
        if(user){
            res.status(400).json({success, error: "Sorry! a user with this email already exists"});
        }
        else{
            //Create new user.
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRECT);
            success = true;
            res.json({success, authToken, msg: "User created successfully"});
        }
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Internal server error. Please report the issue to the admin or try after sometime.");
    }
});

//Get logged in user details. Login required.
router.get("/getLoggedInUser", fetchuser, async(req, res) => {
    try {
       let userId = req.user.id;
       let user = await Users.findById(userId).select("-password");
       res.send(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Internal server error. Please report the issue to the admin or try after sometime.");   
    }    
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var JWT_SECRECT = "This@isasecretsente$nce";
var jwt = require('jsonwebtoken');

//Authenticate user. No login required.
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be bank').exists()
    ] , async(req, res) => {
    let success = false;
    //Validate the email and if is not correct then throw error.
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(404).json({success, errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        let user = await Users.findOne({email});
        if(!user){
            return res.status(401).json({success, error: "Invalid credentials. Please try again"});
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if(!passCompare){
            return res.status(401).json({success, error: "Invalid credentials. Please try again"});
        }
        let payload = {user: {
            id: user.id
        }}
        const authToken = jwt.sign(payload, JWT_SECRECT);
        success = true;
        res.status(200).json({success, authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error. Please report the issue to the admin or try after sometime.");
    }
});

module.exports = router;
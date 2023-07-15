const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')



const JWT_SECRET = 'dollarsignonetime'


//ROUTE 1 create a user using post:"/api/auth/createuser".No login Required

router.post('/createuser', [
    body('email', "Enter a valid e-mail: ").isEmail(),
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('password', "Please enter a password of more than 6 characters").isLength({ min: 6 }),
], async (req, res) => {

    //if there are error return bad request and errors
        
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
        //check weather the user exists already with entered email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "user with email already exists" })
        }

        //creating a password salt
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        //CREATE A USER
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })


        const data = {
            user: {
                id: user.id,
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })


    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");

    }
});

// ROUTE 2 authenticate a user nologin rqd

router.post('/login', [
    body('email', "Enter a valid e-mail ").isEmail(),
    body('password', "Please enter a vailed password ").exists(),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please enter a vailed credentials" });

        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ error: "Please enter a vailed credentials" });

        }

        const data = {
            user: {
                id: user.id,
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");

    }


});


//ROUTE 3 get logged user details using post 'api/auth/getuser' 

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");  // Selecting all the fields except password
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occurred");
    }
});







module.exports = router
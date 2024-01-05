const express = require('express');
const router = express.Router();
const user = require("../models/user");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secert = "MyNameIsLuffy";

router.post("/createuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt =await bcrypt.genSalt(10);
    const secpass =await bcrypt.hash(req.body.password,salt);

    try {
        await user.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email,
            location: req.body.location
        });
        console.log("back called called")
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post("/login", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const email = req.body.email;
        const mailres = await user.findOne({ email });
        if (!mailres) {
            return res.status(400).json({ errors: "Try correct logging with correct credentials" });
        }
        const pwdcompare = bcrypt.compare(req.body.password,mailres.password);
        if (!pwdcompare) {
            return res.status(400).json({ errors: "Try correct looging with correct credentials" });
        }

        const data = {
            user : {
                id:mailres._id
            }
        }

        const authToken = jwt.sign(data,secert);
        res.json({ success: true , authToken});
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router;
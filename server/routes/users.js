import express from 'express';
let router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateInput from '../shared/signupValidation';
import User from '../models/user';
import config from '../config';


router.post('/register', (req, res) => {
    const { errors, isValid } = validateInput(req.body);
    if(!isValid) {
        res.status(400).json(errors);
    } else {
        const { email, password } = req.body;
        User.findOne({'email': email}, (err, user) => {
            if(err) return res.status(500).send();
            if(user) return res.status(500).send("This email already exists in database");
            const newUser = new User({
                email: email,
                password: password
            });
            newUser.save((err, user) => {
                if(err) {
                    return res.status(500).send();
                }
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, config.jwtSecret);
                return res.status(200).json({ token });
            });    
        })      
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({'email': email}, (err, user) => {
        if(err) {
            return res.status(500).send();
        }
        if (!user) {
            return res.status(401).send("Invalid credentials");
        } else {
            user.comparePassword(password, (err, isMatch) => {
                if (isMatch && isMatch == true) {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email
                    }, config.jwtSecret);
                    return res.status(200).json({ token });
                } else {
                    return res.status(401).send("Invalid credentials");
                }
            });
        }
    })
});


export default router;

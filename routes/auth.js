const express = require('express');
const jswt = require('jsonwebtoken'); // for generating new token from api
const secrets = require('../config/secrets.js')
const verifyToken = require('../middleware/verifyToken.js');

const { checkAuth, checkUser } = require('../middleware/auth0');

const router = express.Router();

router.post('/', checkAuth, checkUser, (req, res) => {
// if checkAuth fails, status 401
    if (req.body.user){
        //generating new token with additional payload
        const token = generateToken(req.body.user);
        console.log(token)
        req.body.user.token = token;
        console.log(req.body.user)
        res.status(200).json(req.body.user);
    }
    else
    res.status(500).json({ error: 'Something went wrong while logging in'});
})

//verify user route
router.get('/user/:id', verifyToken, (req, res) => {
    if(req.creds.user_id == req.params.id) {
        res.status(200).json({message: 'user validated'})
    } else {
        res.status(400).json({message: 'invalid user id on record'})
    }
})

//verify shelter route
router.get('/shelter/:id', verifyToken, (req, res) => {
    if(req.creds.shelter_id == req.params.id) {
        res.status(200).json({message: 'shelter validated'})
    } else {
        res.status(400).json({message: 'invalid shelter id on record'})
    }
})

function generateToken(user) {
    const payload = {
        user_id: user.user_id,
        shelter_id: user.shelter_id,
        sub_id: user.sub_id,
        newUser: user.newUser,
        email: user.email
    }
    const options = {
        expiresIn: '1d'
    }
    return jswt.sign(payload, secrets.jwtSecret, options)
}




module.exports=router;
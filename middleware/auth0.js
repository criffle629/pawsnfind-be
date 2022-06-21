const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtDecode = require('jwt-decode');
const Users = require('../models/users/users.js');


// if checkAuth fails, status 401
const checkAuth = jwt({ 
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.jwksUri
    }),
 
    algorithms: ['RS256']
});


function checkUser (req, res, next) {

    const decoded = jwtDecode(req.headers.authorization);

    Users.getUserBySubId(decoded.sub)
    .then(user => {
        //create user record and user meta if user does not exist
        if (!user)
        {
            const newUser = {
                email: decoded.email,
                sub_id : decoded.sub,
                username: decoded.nickname
            }
             Users.createUser(newUser)
             .then(user =>{
                const response = {
                    newUser: true,
                    user_id: user.id,
                    email: decoded.email,
                    email_verified: decoded.email_verified,
                    name: decoded.name,
                    nickname: decoded.nickname,
                    picture: decoded.picture,
                    shelter_id: user.shelter_id,
                    shelter_user_id: user.shelter_user_id,
                    sub_id: decoded.sub
                }
                req.body.user = response;
                next();
            })
            .catch(err => {
                 console.log(decoded.sub);
               res.status(400).json({error: err.message}); 
             })
        }
        //if user exist, return response
        else{
            const response = {
                newUser: false,
                user_id: user.id,
                email: decoded.email,
                email_verified: decoded.email_verified,
                name: decoded.name,
                nickname: decoded.nickname,
                picture: decoded.picture,
                shelter_id: user.shelter_id,
                shelter_user_id: user.shelter_user_id,
                sub_id: decoded.sub
            }
            req.body.user = response;
            next();
        }
    })
        .catch(error => {
        res.status(500).json({message : "issue with getUserById... issue with connecting to backend"})
    })
}

module.exports={ checkAuth, checkUser};

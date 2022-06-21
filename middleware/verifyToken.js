const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                //invalid token
                res.status(401).json({message : 'You have an invalid token!!!'})
            } else {
                //valid token
                req.creds = { user_id : decodedToken.user_id, shelter_id : decodedToken.shelter_id };
                next();
            }
        })
    } else {
        res.status(400).json({ message: "You do not have a token" })
}
}
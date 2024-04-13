const jwtSecret = 'your_jwt_secret'; //has to be the same key used in JWTStrategy

const { Router } = require('express');
const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport.js');

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, //the username you're encoding in JWT
        expiresIn: '7d', //the token will expire in 7 days
        algorithm: 'HS256' //used to "sign" or endoe the values of the JWT
    });
}

//POST login.
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user ) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}
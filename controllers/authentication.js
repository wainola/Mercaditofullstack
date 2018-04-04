const User = require('../model/User');
const jwt = require('jwt-simple');
const config = require('../config');

//generating function to return jwt on registration
function tokenForUser(user){
    //the time when the token was issued
    const timestamp = new Date().getTime();
    /*
        @params
        sub: subject
        iat: issued at time
    */
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}
exports.signup = function(req, res, next){
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    console.log('datos recibidos', email, password);

    User.findOne({email: email}, function(err, existingUser){
        if(err){
            res.json({error: err});
        }
        if(existingUser){
            return res.status(422).send({error: 'Email ya definido'});
        }
        const user = new User({
            email: email,
            password: password
        });
        user.save(function (err) {
            if (err) {
                res.json({error: err});
            }
            res.json({ token: tokenForUser(user) });
        });
    });
};

exports.signin = function(req, res, next){
    res.send({ token: tokenForUser(req.user)});
}
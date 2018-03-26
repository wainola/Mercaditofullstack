const User = require('../model/User');

exports.getUserInfo = function(req, res, next){
    User.findOne({email:email}, function(err, existingUser){
        if(err){ return next(err); }
        if(!existingUser){
            return res.status(422).send({error: 'Usuario no encontrado'});
        }
        else{
            res.send({user: existingUser});
        }
    })
}
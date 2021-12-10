const jwt = require("jsonwebtoken");
var roleHash = require('password-hash');

exports.loggedIn = function (req, res, next) {
    let token = req.header('Authorization');
    
    if(!token) {
        return res.status(403).send({ message: 'You are not authenticated. You need to be logged in.'});
    }

    try{
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }
        
        const verified = jwt.verify(token, secretToken);
        req.user = verified;
        next();
    }catch(err){
        console.log(err)
        res.status(403).send({message: 'Invalid token'});
    }
};

exports.adminOnly = async function(req, res, next){
    if(!roleHash.verify('admin', req.user.role)){
        console.log('uslo')
        return res.status(401).send('Unauthorized!');
    }
    next();
}
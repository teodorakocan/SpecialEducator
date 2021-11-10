const jwt = require("jsonwebtoken");

exports.loggedIn = async (req, res, next) => {
    let token = req.header('Authorization');
    if(!token) {
        return res.status(401).send({ message: 'You are not authorized. You need to be logged in.'});
    }

    try{
        if(token.startsWith('Bearer ')){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, secretToken);
        req.user = verified;
        next();
    }catch(err){
        res.status(401).send({message: 'Invalid token'});
    }
};
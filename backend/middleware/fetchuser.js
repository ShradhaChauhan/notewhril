var jwt = require('jsonwebtoken');
var JWT_SECRECT = "This@isasecretsente$nce";

const fetchuser = (req, res, next)=> {
    //Get the user from jwt token and add the user id to req object.
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try{
        const data = jwt.verify(token, JWT_SECRECT);
        req.user = data.user;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).send("Internal server error");
    }
}

module.exports = fetchuser;
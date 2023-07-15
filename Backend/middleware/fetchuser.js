
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'dollarsignonetime'


fetchuser = (req, res, next) => {

    //get the user from the jwt token and add id ro the req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please used vailed token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "please used vailed token" })


    }

}


module.exports = fetchuser;

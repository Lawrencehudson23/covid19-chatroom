const jwt = require('jsonwebtoken');


module.exports.authenticate = (req,res,next) => {
    try {
        jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        next();
        
    } catch (e) {
        res.status(400).json({message:'Unauthorized'});
        
    }
}
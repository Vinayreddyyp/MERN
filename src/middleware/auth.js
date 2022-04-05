const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async(req, res, next) => {
    console.log('auth is working');
     
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
      
        const decoded = jwt.verify(token, 'thisismynewcourse');
       
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        if(!user) {
            throw new Error('user is not loded');
        }
        req.token = token;
        console.log('req.token', req.token);
        req.user = user;
        next();
    } catch(e) {
       res.status(401).send({error: 'please authenticate'})
    }
}

module.exports = auth;
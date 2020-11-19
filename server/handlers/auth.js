const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = async (req, res, next) => {
   
     try {
         const user = await User.create(req.body);
         const {id, username} = user;

         //Generate json web token
         const maxAge = 1 * 60 * 60
         const token = jwt.sign({id, username}, `${process.env.SECRET}`, { expiresIn: maxAge })
         res.status(201).json({
             id, 
             username, 
             token
         });
     } catch (err) {
         if (err.code === 11000){
             err.message = 'Sorry, that username is already taken'
         }
         next(err)
     }
};

exports.login =  async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        const {id, username} = user;
       
        const valid = await user.comparePassword(req.body.password);

        if(valid){
            //Generate json web token
            const maxAge = 1 * 60 * 60
            const token = jwt.sign({id, username}, `${process.env.SECRET}`, { expiresIn: maxAge })

            res.json({
                id,
                username,
                token
            })
        } else {
            throw new Error('Invalid username/password');
        }
    } catch (err) {
        err.message = 'Invalid username/password'
        next(err)
    }
};
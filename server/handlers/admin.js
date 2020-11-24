const Polls = require('../models/poll');
const User = require('../models/user');
const Image = require('../models/image');
const Admin = require('../models/admin');



//save hero image
exports.saveHeroImage = async (req, res, next) => {
    try {

        console.log('req.file is ' + req.file)
        
        console.log(req.body, req.decoded)

        const { id } = req.decoded;
        
        const user = await User.findById(id)
        console.log(user)

        const image = req.file.path

        const photo = await Image.create({
            image,
            user
        })

        user.image.push(image);
        await user.save();

        res.status(201).json({...photo._doc, user: user._id}) 
        console.log(...photo.doc)

    } catch (err) {
        err.status = 400;
        next(err)
    }
}

exports.createHero = async (req, res, next) => {
    try {
        //getting user from auth middleware
        console.log(req.decoded)

        //console.log(req.file.path)

        const { id } = req.decoded;
        const user = await User.findById(id)

        //const image = user.image[0]

       

        // receiving form valuess
        const { options} = req.body    
        console.log(req.body)
        
        const Himage = req.body.profileImage

        console.log(Himage)

        //const Image = req.file.path
        
        //const pollImage = req.file.path
        const admin = await Admin.create({
            user,
            options: options.map(option => (
                { option: option.option, heroImage: option.heroImage}
            )),
        });
        //making sure the new user holds property as the new poll that is been created
        user.admin.push(admin._id);
        await user.save();

        res.status(201).json({...admin._doc, user: user._id}) 
    } catch (err) {
        err.status = 400 
        next(err);
    }
};   

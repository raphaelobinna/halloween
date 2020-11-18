const Polls = require('../models/poll');
const User = require('../models/user');
const Image = require('../models/image');


// show all the polls
exports.showPolls = async (req, res, next) => {
    try {
        const polls = await Polls.find()
                                 .populate('user', ['username', 'id'])


        res.status(200).json(polls)
    } catch (err) {
        err.status = 400;
        next(err)
    }
};

// show user polls
exports.usersPolls = async (req, res, next) => {
    try {
        const { id } = req.decoded;
        const user = await User.findById(id)
                                .populate('polls')
        res.status(200).json(user.polls)
    } catch (err) {
        err.status = 400;
        next(err)
    }
};



//save user image
exports.saveImage = async (req, res, next) => {
    try {
       

        const { id } = req.decoded;

        const user = await User.findById(id)

        console.log(id)

        console.log(user)

        console.log(req.file)

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
//create poll for the user
exports.createPoll = async (req, res, next) => {
    try {
        //getting user from auth middleware
        console.log(req.decoded)

        //console.log(req.file.path)

        const { id } = req.decoded;
        const user = await User.findById(id)

        //const image = user.image[0]

       

        // receiving form valuess
        const {question, options} = req.body    
        console.log(req.body)
        
        const image = req.body.profileImage

        console.log(image)

        //const Image = req.file.path
        
        //const pollImage = req.file.path
        const poll = await Polls.create({
            question,
            user,
            image,
            options: options.map(option => (
                { option, votes: 0}
            ))
        });
        //making sure the new user holds property as the new poll that is been created
        user.polls.push(poll._id);
        await user.save();

        res.status(201).json({...poll._doc, user: user._id}) 
    } catch (err) {
        err.status = 400 
        next(err);
    }
};   

// get single user poll
exports.getPoll = async (req, res, next) => {
    try {
        const { id } = req.params

        const poll = await Polls.findById(id)
                                .populate('user', [
                                    'username',
                                     'id'
                                ])

        if(!poll) throw new Error('No poll found')

        res.status(200).json(poll);
    } catch (err) {
        err.status = 400
        next(err)
    }
};
//delete user poll
exports.deletePoll = async (req, res, next) => {
    try {
        const { id: pollId } = req.params
        const { id: userId } = req.decoded

        const poll = await Polls.findById(pollId)

        if(!poll) throw new Error('No poll found')

        //authenticating user ID
        if(poll.user.toString() !== userId) {
            throw new Error('Unauthorized access')
        }
        
        await poll.remove();
        res.status(202).json(poll)
    } catch (err) {
        err.status = 400
        next(err);
    }
};

// vote
exports.vote = async (req, res, next) => {
    try {
        const { id: pollId } = req.params
        const { id: userId } = req.decoded

        const { answer } = req.body
// voting process

        if(answer) {
            const poll = await Polls.findById(pollId)
            if(!poll) throw new Error('No poll found')
//filling in the optionSchema array by adding the option: string and vote
            
              const vote = poll.options.map(
                option => {
                   if (option.option === answer){
                       return {
                           option: option.option,
                            _id: option._id,
                            votes: option.votes + 1
                        };
                   } else {
                       return option
                   }

                }
            );
// checking if its the authenticated user that voted and also eligibility to vote

            if (poll.voted.filter(user =>
                user.toString() === userId
                ).length <= 0) {
                    poll.voted.push(userId);
                    poll.options = vote;
                    await poll.save();
                res.status(202).json(poll)
                } else {
                    throw new Error('Already voted')
                }
        } else {
            throw new Error('No answer provided')
        }
        
    } catch (err) {
        err.status = 400
        next(err);
    }
};
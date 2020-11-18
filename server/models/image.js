const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Photo = mongoose.model('Images', ImageSchema)
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option: String,
    heroImage: String,

});


const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    options: [optionSchema],
    created: {
        type: Date,
        default: Date.now
    },
});
 
module.exports = mongoose.model('Admin', adminSchema);
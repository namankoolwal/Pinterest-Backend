const mongoose = require('mongoose');
const pim = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String},
    posts:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    email: { type: String, required: true, unique: true },
    boards:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            index: true
        }
    ],
    avatar: { 
        data: Buffer, // Store the binary image data
        contentType: String // Store the content type of the image
     },
    fullname: { type: String  , required: true },
    
})


userSchema.plugin(pim);


const User = mongoose.model('User', userSchema);

module.exports = User;
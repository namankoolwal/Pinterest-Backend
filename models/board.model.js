const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  coverImg: {
    url: String, // Store the binary image data
    contentType: String // Store the content type of the image
  },
  boardTitle:{
    type: String,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  posts:[
    {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }
  ],
  createdAt:{
    type: Date,
    default: Date.now
  },
  
});

module.exports = mongoose.model('Board', BoardSchema);

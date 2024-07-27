const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  img: {
    data: Buffer, // Store the binary image data
    contentType: String // Store the content type of the image
  },
  posttext:{
    type: String,
    required: true
  },
  postDesc:{
    type: String,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  board:{
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
  tag:{
    type: String,
    required: true,
    index: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  likes:{
    type:Array,
    default:[]
  }
  
});

module.exports = mongoose.model('Post', PostSchema);

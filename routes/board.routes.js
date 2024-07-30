const express = require('express');
const Board = require('../models/board.model');
const User = require('../models/user.model');
const Post = require('../models/post.model');
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require('../utils/multer');

const router = express.Router();
// router.use(isLoggedIn);

router.get('/', async (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const user = await User.find()
  const posts = await Post.find()
  const boards = await Board.find()

  res.send(`This is the board route <br> ${fullUrl} <br> total users registered ${user.length} <br> total posts ${posts.length} <br> total boards ${boards.length}`);
}); 

router.post('/create', isLoggedIn, upload.single('coverImg'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const userId = req.session.passport.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // console.log("inside board route /create" , req.file);

    const board = await Board.create({
      coverImg: {
        url: req.file.path, // Cloudinary URL
        contentType: req.file.mimetype,
      },
      boardTitle: req.body.boardTitle,
      user: user._id,
    });

    user.boards.push(board._id);
    await user.save();

    req.flash('success', 'Board Created');
    res.redirect('/posts/createPost');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
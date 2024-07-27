const express = require('express');
const Board = require('../models/board.model');
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require('../models/user.model');
const upload = require('../utils/multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();
// router.use(isLoggedIn);

router.get('/', async (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.send(`This is the board route <br> ${fullUrl}`);
}); 

router.post('/create', isLoggedIn ,upload.single("coverImg") ,async(req,res)=>{
  const fullUrl =  req.originalUrl;
  console.log(fullUrl);
    if (!req.file) {
        return res.status(400).send("No file uploaded");
      }
    //   console.log(req.body)
    
      try {
        const userId = req.session.passport.user;
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const filePath = path.resolve(req.file.path);
        const board = await Board.create({
          coverImg: {
            data: fs.readFileSync(filePath),
            contentType: req.file.mimetype,
          },
          boardTitle: req.body.boardTitle,
          user: user._id,
        });
    
        user.boards.push(board._id);
        await user.save();
    
        fs.unlink(filePath, (err) => {
          if (err) console.error(err);
        });
    
        req.flash("success", "Board Created");
        res.redirect("/posts/createPost");
      } catch (error) {
        console.error(error);
        fs.unlink(filePath, (err) => {
            if (err) console.error(err);
        });
        res.status(500).send("Server error");
      }
})

module.exports = router;
const express = require("express");
const upload = require("../utils/multer");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");

const {
  feed,
  createPost,
  uploadPost,
  showPost,
  showBoard,
  singlePost,
} = require("../controllers/post.controller");

router.use(isLoggedIn);

router.route("/").get(feed);

router.route("/createPost").get(createPost);

router.route("/upload").post(upload.single("file"), uploadPost);

router.route("/show").get(showPost);

router.route("/show/:boardid").get(showBoard);

router.route("/post/:postid").get(singlePost);


module.exports = router;

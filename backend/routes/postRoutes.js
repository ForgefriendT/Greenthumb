const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

// @route   GET api/posts
// @desc    Get all posts
// @access  Private (or Public? "Users can view all posts" - usually logged in for simplicity or consistent auth)
// Making it Private as per general structure, but if "Users" implies logged in users, then yes.
router.get('/', auth, postController.getPosts);

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, postController.createPost);

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', auth, postController.addComment);

module.exports = router;

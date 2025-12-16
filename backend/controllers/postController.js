const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }).populate('user', ['username']);
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Create a post
exports.createPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            user: req.user.id,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add a comment
exports.addComment = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            user: req.user.id,
            username: user.username,
            text: req.body.text,
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

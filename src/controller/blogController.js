const Blog = require("../models/blogModel");

// create new blog
const createBlog = async(req, res) => {
    try {
        const { userId} = req.user;
        const { title, content} = req.body;

        const blog = new Blog({ title, content, user: userId});
        await blog.save();
        
        if (!blog) {
            return res.status(400).json({error: " blog creation failed"});
        }
        return res.status(201).json({message: " blog created successfully", blog});
    } catch (error) {
        res.status(500).json ({error: " Internal server error"});
    }
};


// get all blog
const getBlogs = async(req, res) => {
    try {
    const blogs = await Blog.find().populate("user", "email _id");
    return res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json ({error: " Internal server error"});
    }
};


// get single blog
const getSingleBlog = async(req, res) => {
    try {
    
    } catch (error) {
        res.status(500).json ({error: " Internal server error"});
    }
};
module.exports = { createBlog, getBlogs, getSingleBlog} ;
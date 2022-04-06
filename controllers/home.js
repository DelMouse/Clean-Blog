const BlogPost = require('../models/BlogPostModel');

module.exports = async (req,res) => {
    const blogpostsQuery = await BlogPost.find({});
    res.render('index', {
        blogposts:blogpostsQuery
    })
}
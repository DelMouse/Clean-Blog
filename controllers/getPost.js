const BlogPost = require('../models/BlogPostModel');

module.exports = async (req,res) => {
    const blogpostQuery = await BlogPost.findById(req.params.id);
    res.render('post',{
        blogpost : blogpostQuery
    })
}
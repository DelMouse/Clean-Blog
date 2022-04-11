const BlogPost = require('../models/BlogPostModel');

module.exports = async (req,res) => {
    const blogpostsQuery = await BlogPost.find({});
    console.log(req.session)
    res.render('index', {
        blogposts:blogpostsQuery
    })
}
const BlogPost = require('../models/BlogPostModel');
const path = require('path');

module.exports = (req,res) => {
    let image = req.files.image;//user uploaded image from post form
    //Move image to user dir then create new blog post
    image.mv(path.resolve(__dirname, 'public/user-images', image.name), async (error) => {
        //create post ad image url to background image in post ejs
        await BlogPost.create({...req.body, image: '/user-images/' + image.name}) //err == error message
        //back to homepage
        res.redirect('/');
    });
}
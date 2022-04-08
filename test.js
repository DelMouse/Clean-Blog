const mongoose = require('mongoose');

/**
 * Import BlogPost Model from models directory. BlogPost represents BlogPosts collection
 * in the database.
 * @type {Model<*>}
 */
const BlogPost = require('./models/BlogPostModel');

//Connect to AtlasDatabase database, it will create 'clean-blog-db database if one is not present
//---------------------------------------------------------CONNECTION STRING REMOVED--------------------------------------------------------------------//
//Creates new blogpost and pass callback function in the event of error called blogpost
BlogPost.create({
    title: 'The Mythbusters Guide to Saving Money on Energy Bills 3',
    body: 'Second Blog entry! 3'
}, (error,msg) => {//Error or message from database
    console.log(msg)
})

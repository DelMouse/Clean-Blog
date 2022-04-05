//This is a data collection, each entry is a document. This enables
//CRUD operations (create, read update, and delete)
const mongoose = require('mongoose');//Reguire mongoose for backend database
const Schema = mongoose.Schema;//Create data schema

const BlogPostSchema = new Schema({
   title: String,
   body: String,
   username:String,
   datePosted:{
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number
      default: Date.now
   },
   image: String
});

/**
 * Access to the Database via mongoose model.
 * BlogPostModel is the name of the collection
 * @type {Model<unknown>}
 */
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;//Export the model data as var of BlogPostModel to be used in other files
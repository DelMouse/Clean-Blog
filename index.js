const express = require('express');//Require express module
const mongoose = require("mongoose");//Database helper
const ejs = require('ejs');//View Engine
const fileUpload = require('express-fileupload');


const homeController = require('./controllers/home');
const newPostController = require('./controllers/newPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');


/**
 * body object that contains parsed data from the form submitted
 * access individual properties like req.body(request body).title or
 */
let bodyParser = require('body-parser');
//create Express app
const app = new express();//Create express app *IT JUST WORKS, LEAVE IT AT THAT!

/**
 * MIDDLEWARE
 * Executes in middle of the request and next() signifies done and what to do 'next'
 * great for form validation.
 */
//Checks to make sure the title, body and files are sent when submitting form when creating a new post
const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.body == null){
        return res.redirect('/posts/new')
    }
    next();
}

/**
 * ...USES
 * MAke USE of some of the build in functionality provided by npm modules that are required
 */
app.set('view engine', 'ejs');//View engine setup
app.use(express.static('public'));//Public files in head of ejs file (HTML)
app.use(bodyParser.json());//parse jason data from the request from form
//The extended option allows to choose between parsing the URL-encoded data with the querystring
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/posts/store',validateMiddleWare);//Validation middleware to be used only on the create post page


/**
 *GET ROUTES
 */
//Home page. Makes call to DB and gets all blogpost,hen gives index.ejs access to data.
//retrieving DB data and assigning them to var blogposts:blogpost to be returned
app.get('/',homeController);

//GetPost Controller render with post ejs
app.get('/post/:id',getPostController);

//Create new post rendered with post ejs
app.get('/posts/new',newPostController);


/**
 * POST ROUTES
 */
app.post('/posts/store',storePostController);


/**
 * APP LISTENER ON PORT 3000 (LEAVE ALONE)
 */
app.listen(3000, () => {
    console.log('App is listening on port 3000');
})


/**
 * DATABASE CONNECTIONS
 */
try{
    //Connections to the database, first locally and Web based
    mongoose.connect('mongodb://127.0.0.1:27017/clean-blog-db', {useNewUrlParser:true});
    //Connect to AtlasDatabase database, it will create 'clean-blog-db database if one is not present
    //mongoose.connect('mongodb+srv://delgroh:datadonkey@cluster0.y7enq.mongodb.net/clean-blog-db?retryWrites=true&w=majority', {useNewUrlParser:true});
}catch (error){
    console.log(error)
}

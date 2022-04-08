/**
 * MODULES PROVIDED BY NODE REQUIRED FOR APP
 */
const express = require('express');//Require express module
const mongoose = require("mongoose");//Database helper
const ejs = require('ejs');//View Engine
const fileUpload = require('express-fileupload');

/**
 *REQUIRED CONTROLLER FILES
 */
const homeController = require('./controllers/home');
const newPostController = require('./controllers/newPost');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const validationMiddleware = require('./middleware/validationMiddleware');


/**
 * body object that contains parsed data from the form submitted
 * access individual properties like req.body(request body).title or
 */
let bodyParser = require('body-parser');
//create Express app
const app = new express();//Create express app *IT JUST WORKS, LEAVE IT AT THAT!


/**
 * ...USES
 * MAke USE of some build in functionality provided by npm modules that are required.
 * Set view engine to ejs, Allow use of public directory for public files, css, imgs ect.
 * Use Body parser for parsing browser request and responses. Use file upload module from built in node.
 */
app.set('view engine', 'ejs');//View engine setup
app.use(express.static('public'));//Public files in head of ejs file (HTML)
app.use(bodyParser.json());//parse jason data from the request from form
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


/**
 * MIDDLEWARE
 * Executes in middle of the request and next() signifies done and what to do 'next'
 * great for form validation.
 */
app.use('/posts/store',validationMiddleware);//Validation middleware to be used only on the create post page


/**
 *GET ROUTES
 */
app.get('/auth/login',loginController);
//Home page. Makes call to DB and gets all blogpost,hen gives index.ejs access to data.
//retrieving DB data and assigning them to var blogposts:blogpost to be returned
app.get('/',homeController);

//GetPost Controller render with post ejs
app.get('/post/:id',getPostController);

//Create new post rendered with post ejs
app.get('/posts/new',newPostController);

//Create new post rendered with post ejs
app.get('/auth/register',newUserController);

/**
 * POST ROUTES
 */
//Store Users Post
app.post('/posts/store',storePostController);

//Store Users in DB
app.post('/users/register',storeUserController);

app.post('/users/login',loginUserController);


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

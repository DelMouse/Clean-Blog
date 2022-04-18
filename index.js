/**
 * MODULES PROVIDED BY NODE REQUIRED FOR APP
 */
const express = require('express');//Require express module
const bodyParser = require('body-parser');//Parse request body
const mongoose = require("mongoose");//Database helper
const ejs = require('ejs');//View Engine
const fileUpload = require('express-fileupload');//File helper
const expressSession = require('express-session');//Login session helper

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
const logOutController = require('./controllers/logOut');

/**
 *REQUIRED MIDDLEWARE FILES
 */
const validationMiddleware = require('./middleware/validationMiddleware');
//check for user logged in before calling the controller
const authMiddleware = require('./middleware/authMiddleware');
//redirect to the home page if logged in and click on Login link or new user link
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

/**
 * body object that contains parsed data from the form submitted
 * access individual properties like req.body(request body).title or
 */
//create Express app
const app = new express();//Create express app *IT JUST WORKS, LEAVE IT AT THAT!
app.listen(3000, () => {// * APP LISTENER ON PORT 3000 (LEAVE ALONE)
    console.log('App is listening on port 3000');
})

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
app.use('/posts/store',validationMiddleware);

/**
 * Session ID exchanged with the server and users browser to tell which user is logged in.
 *secret: sign and encrypt the session ID cookie being shared with browser
 */
app.use(expressSession({secret: 'mighty mouse'}));

/**
 *For Authentication, hiding and showing tabs based on logged in status
 */
global.loggedIn = null;
app.use("*", (req,res,next) => {
    loggedIn = req.session.userId
    next()
})

/**
 *ROUTES
 */
//Create new post rendered with post ejs
app.get('/',homeController);
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController);
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController);
app.get('/post/:id',getPostController);
app.get('/posts/new',authMiddleware,newPostController);
app.get('/auth/logout',logOutController);

/**
 * POST ROUTES
 */
//Store Users Post
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController);//Login user route
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController);//Store Users in DB
app.post('/posts/store',authMiddleware,storePostController);

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

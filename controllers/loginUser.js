const bcrypt = require('bcrypt');//Import bcrypt for passwords
const User = require('../models/UserModel');//Import users model

/**
 *Find inputted users name, if exists compare (bcrypt.compare) passwords login to home page
 * if user don't exist  redirect back to login page.
 *
 * session package saves data on the users browser so that each time the user makes a request
 * a cookie will be sent back to the server with the authenticated ID (same is user id in DB)
 * to know if user is logged in.
 */
module.exports = (req,res) => {
  const { username, password} = req.body;
  User.findOne({username:username}, (error,user) => {
      if(user){
          bcrypt.compare(password, user.password, (error,same) => {
              if(same){//if passwords match
                  req.session.userId = user._id;
                  res.redirect('/');
              }else{
                  res.redirect('/auth/login');
              }
          })
      }else{
          res.redirect('/auth/login');
      }
  })
};
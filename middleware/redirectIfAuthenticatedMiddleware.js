/**
 * Middleware to interrupt request and check if session.Id is sent in request
 * Redirect to the home page if logged in and click on Login link or new user link
 */
// module.exports = (req,res,next) => {
//   if(req.session.userId) {
//       return res.redirect('/'); //if user is logged in redirect to home page
//   }
//   next();
// };
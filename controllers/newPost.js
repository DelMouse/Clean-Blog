//Create new post if user is logged in, if not send back to login page
module.exports = (req,res) => {
    if(req.session.userId){
        res.render('create');
    }
    res.redirect('/auth/login');
}
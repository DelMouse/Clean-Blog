/**
 * Validtion to check the creation of the new post page by checking the req,res,
 * next data parameters from the form when sent.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req,res,next)=>{
    if(req.files ==null || req.body.title == null || req.body.body == null){
        return res.redirect('/posts/new');
    }
    next();
};

/**
 *VALIDATION FOR FILE UPLOADS
 * Check request for included files, in this case make sure title and body are not null
 * (this does not prevent empty strings) redirect to new post page
 */
module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.body == null) {
        return res.redirect('/posts/new')
    }
    next();
}
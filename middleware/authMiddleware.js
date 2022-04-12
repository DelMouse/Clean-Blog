//Import user model
const User = require('../models/UserModel');

/**
 *fetch the user from database, if user don't exist, direct back to home page
 * if user is valid permit request carry on with next
 */
module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        if (error || !user)
            return res.redirect('/');

        next()

    })
}
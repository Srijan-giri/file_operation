const isAuthenticated = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
        return next();
    }
    console.log("user is not authorized")
    res.redirect('/');

}

module.exports = { isAuthenticated };
module.exports = (req,res,next) => {
    if(!req.session.isLoggedIn){
        req.flash("errors", "You Should Be Logged In");
        return res.redirect("/");
    }
    next();
}
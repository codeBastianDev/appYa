
exports.GetLogin = (req, res, next) => {

    res.render("auth/login",
        {
            pageTittle: "Login",
            loginActive: true,
        }
    );

}

exports.PostLogin = (req, res, next) => {
    res.setHeader("Set-Cookie","loggedIn=true; expires=" + new Date(new Date().getTime() + 86409000).toUTCString()); 
    res.redirect("/")
}

exports.PostLogout = (req, res, next) => {
    res.setHeader("Set-Cookie","loggedIn=true; expires=" + new Date(new Date().getTime() + 86409000).toUTCString()); 
    res.redirect("/")
}
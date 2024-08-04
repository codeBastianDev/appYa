const User = require("../models/User");
const Commerce = require("../models/Commerce");
const bcrypt = require("bcryptjs");
const helper = require("../utils/helper")


//handle loggin
const handleLogin = (user, password, req, res, userType) => {
    bcrypt.compare(password, user.password)
        .then((result) => {
            if (result) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.userType = userType; 
                return req.session.save(err => {
                    if (err) {
                        console.log(err);
                        req.flash("errors", "An error has occurred, contact admin");
                        return res.redirect("/login");
                    }
                    res.redirect("/");
                });
            } else {
                req.flash("errors", "Password is invalid");
                return res.redirect("/login");
            }
        })
        .catch((error) => {
            console.log(error);
            req.flash("errors", "An error has occurred, contact admin");
            return res.redirect("/login");
        });
};


//Login and LogOut
exports.GetLogin = (req, res, next) => {

    res.render("auth/login",
        {
            pageTittle: "Login",
            loginActive: true,
        }
    );
}

exports.PostLogin = (req, res, next) => {
    const { mail, password } = req.body;

    User.findOne({ where: { mail: mail } })
        .then((user) => {
            if (!user) {
                return Commerce.findOne({ where: { mail: mail } })
                    .then((commerce) => {
                        if (!commerce) {
                            req.flash("errors", "Email is invalid");
                            return res.redirect("/login");
                        }
                        handleLogin(commerce, password, req, res, 'commerce');
                    });
            }
            handleLogin(user, password, req, res, 'customer');
        })
        .catch((err) => {
            console.log(err);
            req.flash("errors", "An error has occurred, contact admin");
            return res.redirect("/login");
        });
};

exports.PostLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/");
    })
}


//Register
exports.GetSignup = (req, res, next) => {

    res.render("auth/signup",
        {
            pageTittle: "Signup",
            signupActive: true,
            
        }
    );
}


exports.GetSignupCommerce = (req, res, next) => {

    res.render("auth/signupCommerce",
        {
            pageTittle: "SignupCommerce",
            signupActive: true,
            
        }
    );
}

exports.PostSignup = (req, res, next) => {
    let Image = helper.saveImage(req.file)
    const username = req.body.username;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const mail = req.body.mail;
    const phone = req.body.phone;
    const photo = Image;
    const dni = req.body.dni;
   
    if(password !== confirmpassword)
    {
        req.flash("errors","Password and Confirmpassword dont match");
        return res.redirect("/signup");
    }

    User.findOne({
        where: { mail: mail}
    })
    .then((user) =>{
        if(user){
            req.flash("errors","This email already exists");
            return res.redirect("/signup");
        }   

        bcrypt.hash(password,12).then((hashedPassword) => {

            User.create({
                username: username,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname,
                mail: mail,
                phone: phone,
                photo: photo,
                dni: dni,
                roleId: 1,
                isActive: true,
                availability: true,
            })
            .then(result =>{
                res.redirect("/login");
            })
            .catch(err =>{
                console.log(err);
                return res.redirect("/signup");
            });

        })
        .catch((error) => {
            console.log(error)
        });

    })
    .catch(err =>{
        console.log(err);
        return res.redirect("/signup");
    });
}

exports.PostSignupCommerce = (req, res, next) => {
    let Image = helper.saveImage(req.file)
    const commerceName = req.body.commerceName;
    const phone = req.body.phone;
    const mail = req.body.mail;
    const openingTime = req.body.openingTime;
    const closingTime = req.body.closingTime;
    const commerceType = req.body.commerceType;
    console.log("El tipo de comercio es:" + commerceType);
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    const photo = Image;

    console.log("revisar")
    console.log(password)
    console.log(confirmpassword)
   
    if(password !== confirmpassword)
    {
        req.flash("errors","Password and Confirmpassword dont match");
        return res.redirect("/signupCommerce");
    }

    Commerce.findOne({
        where: { mail: mail}
    })
    .then((commerce) =>{
        if(commerce){
            req.flash("errors","This email already exists");
            return res.redirect("/signupCommerce");
        }   

        bcrypt.hash(password,12).then((hashedPassword) => {

            Commerce.create({
                name: commerceName,
                phone: phone,
                mail: mail,
                password: hashedPassword,
                photo: photo,
                openTime: openingTime,
                closeTime: closingTime,
                isActive: true,
                idTypeCommerce: commerceType,
            })
            .then(result =>{
                res.redirect("/login");
            })
            .catch(err =>{
                console.log(err);
                return res.redirect("/signupCommerce");
            });

        })
        .catch((error) => {
            console.log(error)
        });

    })
    .catch(err =>{
        console.log(err);
        return res.redirect("/signupCommerce");
    });
}
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const helper = require("../utils/helper")



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
    const mail = req.body.mail;
    const password = req.body.password;

    User.findOne({ where: { mail: mail } })
    .then((user) => {
        if(!user)
        {
            req.flash("errors","Email is invalid");
            return res.redirect("/login");
        }

        bcrypt.compare(password, user.password)
            .then((result) => {
                if(result){
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        if(err){
                            console.log(err);
                            return res.redirect("/login");
                        }
                        res.redirect("/");
                    });
                }
                req.flash("errors","Password is invalid");
                res.redirect("/login");
            })
            .catch((error) => {
                req.flash("errors","An error has occurred, contact admin");
                return res.redirect("/login");
            });

    })
    .catch(err =>{
        req.flash("errors","Email is invalid");
        return res.redirect("/login");
    });
}

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
const Role = require("../models/Role");

exports.GetAll = (req,res,next) => {

    Role.findAll()
        .then((result) => {
            const roles = result.map((result) => result.dataValues);
            res.render("Roles/index", {
                rols: roles,
            });
        })
        .catch((err) => {
        /*promise failed*/
        console.log(err);
        next(err);
        });     //promise
};
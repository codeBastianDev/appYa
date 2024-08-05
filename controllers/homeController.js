const TypeCommerce = require("../models/TypeCommerce");

exports.GetAll = (req,res,next) => {
    
    TypeCommerce.findAll()
    .then((result) => {
        if(!result){
            req.flash("errors", "Dont have any");
            return res.redirect("/home/index");
        }
        const typeCommerces = result.map((result) => result.dataValues);

        res.render("home/index",
            {
                pageTittle: "Home",
                homeActive: true,
                typeCommerces: typeCommerces,
            }
        );
    })
    .catch((error) => {
        console.error("Error fetching types:", error);
        req.flash("errors", "Error fetching types");
        res.redirect("/home/index");
    });
};

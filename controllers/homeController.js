const TypeCommerce = require("../models/TypeCommerce");
const db = require("../contexts/cnx")
const {query} = require("sequelize");

exports.GetAll = async (req,res,next) => {
    
    TypeCommerce.findAll()
    .then((result) => {
        if(!result){
            req.flash("errors", "Dont have any");
            return res.redirect("/home/index");
        }
        const typeCommerces = result.map((result) => result.dataValues);
      
        var query =`SELECT c.name nombre,
                        o.id,
                        DATE_FORMAT(o.createdAt,'%d %M %h:%i') fecha,
                        o.total,
                        c.photo foto,
                        COUNT(p.name) pedidos,
                        case 
                        WHEN o.status = 1  THEN 'PENDIENTE'
                        WHEN o.status = 2  THEN 'PROCESO' 
                        WHEN o.status = 2  THEN 'COMPLETO' 
                        END estado
                    FROM commerces c
                    JOIN orders o on o.commerceId = c.id
                    JOIN orderdetails od on od.orderId = o.id
                    JOIN products p ON p.id = od.productId
                    WHERE c.id = ${req.session.user.id}
                    GROUP by o.id`;
        
                    db.query(query).then(orden =>{
                        console.log(orden)
                        res.render("home/index",
                            {
                                pageTittle: "Home",
                                homeActive: true,
                                typeCommerces: typeCommerces,
                                order:orden[0].map(r => r)
                            }
                        );
                    })
       

    
    })
    .catch((error) => {
        console.error("Error fetching types:", error);
        req.flash("errors", "Error fetching types");
        res.redirect("/home/index");
    });
};

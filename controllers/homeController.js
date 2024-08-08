const TypeCommerce = require("../models/TypeCommerce");
const Orders = require("../models/Order");
const Commerces = require("../models/Commerce");
const { Op } = require("sequelize");
const Users = require("../models/User");
const Products = require("../models/Product");

const db = require("../contexts/cnx")
const {query} = require("sequelize");

exports.GetAll = async (req, res, next) => {
    try {
        const typeCommercesResult = await TypeCommerce.findAll();
        const typeCommerces = typeCommercesResult.map(result => result.dataValues);
        
        // Obtener cantidades de pedidos
        const totalOrders = await Orders.count();
        const todayOrders = await Orders.count({
            where: {
                createdAt: {
                    [Op.gte]: new Date().setHours(0, 0, 0, 0),
                    [Op.lt]: new Date().setHours(23, 59, 59, 999)
                }
            }
        });

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

        // Obtener cantidades de comercios activos e inactivos
        const activeCommerces = await Commerces.count({ where: { isActive: true } });
        const inactiveCommerces = await Commerces.count({ where: { isActive: false } });

        const activeCustomers = await Users.count({ where: { roleId: 1, isActive: true } });
        const inactiveCustomers = await Users.count({ where: { roleId: 1, isActive: false } });

        const activeDeliveries = await Users.count({ where: { roleId: 3, isActive: true } });
        const inactiveDeliveries = await Users.count({ where: { roleId: 3, isActive: false } });

        const totalProducts = await Products.count();

        const querySebas = await db.query(query);

        res.render("home/index", {
            pageTitle: "Home",
            homeActive: true,
            typeCommerces: typeCommerces,
            totalOrders: totalOrders,
            todayOrders: todayOrders,
            activeCommerces: activeCommerces,
            inactiveCommerces: inactiveCommerces,
            activeCustomers: activeCustomers,
            inactiveCustomers: inactiveCustomers,
            activeDeliveries: activeDeliveries,
            inactiveDeliveries: inactiveDeliveries,
            totalProducts : totalProducts,
            order: querySebas[0].map(r => r),
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        req.flash("errors", "Error fetching data");
        res.redirect("/home/index");
    }
};
const Users = require("../models/User");
const Favorites = require("../models/Favorite");
const Commerces = require("../models/Commerce");
const order = require("../models/Order");
const helper = require("../utils/helper");
const OrderDetails = require("../models/OrderDetail");
const db = require('../contexts/cnx');
const { where } = require('sequelize');

exports.GetProfile = async (req, res) => {
  var id = req.session.user.id;
  if (id > 0) {
    try {
      let result = await Users.findOne({
        where: { id: id },
      });
      console.log(result.toJSON());
      res.render("profile/customer", { profile: result.toJSON() });
    } catch (error) {
      console.error("Error al obtener el Customer:", error);
      res.status(500).send("Error en el servidor");
      z;
    }
  } else {
    res.render("commerces/save", { commerce: {} });
  }
};

// Método para insertar o actualizar un comercio
exports.insert = async (req, res) => {
  let campo_photo = {};
  const { id, firstname, lastname, phone, mail } = req.body;
  if (req.file != undefined) {
    photo = req.file;
    photo = helper.saveImage(photo);
    campo_photo.photo = photo;
  } else {
    campo_photo = null;
  }
  console.log("Photo Null" + campo_photo);
  try {
    await Users.update(
      {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        mail: mail,
        ...campo_photo,
      },
      {
        where: { id: req.session.user.id },
      }
    );
    res.redirect("/profileCustomer");
  } catch (error) {
    console.error("Error save user:", error);
    res.status(500).send("Error in server");
  }
};

exports.GetFavorites = async (req, res) => {
  var id = req.session.user.id;

  if (id > 0) {
    try {
      let result = await Favorites.findAll({
        where: { userId: id },
        include: [{
            model: Commerces,
            attributes: ["name", "photo"]
          }],
      });

      let favorites = result.map(favorite => {
        return {
          id: favorite.id,
          commerceName: favorite.commerce.name,
          commercePhoto: favorite.commerce.photo
        };
      });
      console.log(favorites);
      res.render("customer/favorite", {
        favorites: favorites,
      });
    } catch {
      console.error("Error al obtener los favoritos:", error);
      res.status(500).send("Error en el servidor");
    }
  }
};

exports.delete = async(req,res)=>{
    id = ((req.body.id))
    console.log(id);
    await Favorites.destroy({
        where:{
            id:id
        }
    });
}


exports.order = async(req,res)=>{
  id = req.session.user.id;
  var query =`SELECT c.name nombre,
                     o.id,
                     DATE_FORMAT(o.createdAt,'%d %M %h:%i') fecha,
                     o.total,
                     c.photo foto,
                     COUNT(p.name) pedidos,
                      case 
                        WHEN o.status = 1  THEN 'PENDIENTE'
                        WHEN o.status = 2  THEN 'PROCESO' 
                        WHEN o.status = 3  THEN 'COMPLETO' 
                      END estado
                  FROM commerces c
                  JOIN orders o on o.commerceId = c.id
                  JOIN orderdetails od on od.orderId = o.id
                  JOIN products p ON p.id = od.productId
                  WHERE o.userId = ${id}
                  GROUP by o.id`;

   result =  await db.query(query)
    
   res.render("customer/order",{order:result[0].map(r =>r )})
}

exports.orderView = async(req,res)=>{
  id = req.session.user.id;
  orderID = req.params.id;

  var query =`SELECT c.name,o.id nombre,
                     DATE_FORMAT(o.createdAt,'%d %M %h:%i') fecha,
                     o.createdAt,
                     o.total,
                     p.name producto,
                     p.price precio,
                     p.photo fotoProducto,
                      case
                        WHEN o.status = 1  THEN 'Pendiente'
                        WHEN o.status = 2  THEN 'PROCESO'
                        WHEN o.status = 2  THEN 'COMPLETO'
                      END estado
                  FROM commerces c
                  JOIN orders o on o.commerceId = c.id
                  JOIN orderdetails od on od.orderId = o.id
                  JOIN products p ON p.id = od.productId
                  WHERE o.userId = ${id} and o.id = ${orderID}`;
  result = await db.query(query)

  dato = {
      comercio: result[0][0].name,
      fecha:  result[0][0].fecha,
      estado: result[0][0].estado
  }
  res.render('customer/detalleOrder',{order:result[0].map(r => r ),dato:dato})
}

exports.orderCliente = async(req,res)=>{
  id = req.session.user.id;
  var query =`SELECT c.name nombre,
                     o.id,
                     DATE_FORMAT(o.createdAt,'%d %M %h:%i') fecha,
                     o.total,
                     c.photo foto,
                     COUNT(p.name) pedidos,
                      case 
                        WHEN o.status = 1  THEN 'PENDIENTE'
                        WHEN o.status = 2  THEN 'PROCESO' 
                        WHEN o.status = 3  THEN 'COMPLETO' 
                      END estado
                  FROM commerces c
                  JOIN orders o on o.commerceId = c.id
                  JOIN orderdetails od on od.orderId = o.id
                  JOIN products p ON p.id = od.productId
                  WHERE c.id = ${id}
                  GROUP by o.id`;

   result =  await db.query(query)
    
   res.render("customer/order",{order:result[0].map(r =>r )})
}


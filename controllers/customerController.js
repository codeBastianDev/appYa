const Users = require("../models/User");
const Favorites = require("../models/Favorite");
const Commerces = require("../models/Commerce");
const helper = require("../utils/helper");

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
        where: { id: 1 },
      }
    );
    res.redirect("/");
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
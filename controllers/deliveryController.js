const Users = require("../models/User"); 
const helper =  require("../utils/helper");
const { where,Op, DATEONLY } = require('sequelize');

exports.GetProfile = async (req, res) => {
    const userId = req.session.user.id;
    try {
        const profile = await Users.findByPk(userId);
        res.render("profile/delivery", {
            id: profile.id,
            firstname: profile.firstname,
            lastname: profile.lastname,
            phone: profile.phone,
            photo: profile.photo,
            mail: profile.mail
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user profile");
    }
};

exports.updateProfile = async (req, res) => {
    const userId = req.session.user.id;
    const { firstname, lastname, phone, mail } = req.body;
    let campo_photo = {};

    if (req.file != undefined) {
        let photo = req.file;
        photo = helper.saveImage(photo);
        campo_photo.photo = photo;
    } else {
        campo_photo = null;
    }

    try {
        await Users.update({
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            mail: mail,
            ...campo_photo
        }, {
            where: { id: userId }
        });
        res.redirect("/profileDelivery");
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).send('Error en el servidor');
    }
};

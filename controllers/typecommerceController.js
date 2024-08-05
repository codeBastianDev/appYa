const Commerce = require("../models/Commerce");
const TypeCommerce = require("../models/TypeCommerce");
const Favorite = require("../models/Favorite");
const { Op } = require('sequelize');


// exports.GetCommercesByType = (req, res, next) => {

//     const typeId = req.params.typeId;
//     const searchQuery = req.query.search || '';

//     Commerce.findAll({
//         where: { idTypeCommerce: typeId, 
//             name: {
//                 [Op.like]: `%${searchQuery}%` // Filtra por nombre usando LIKE
//             }
//         },
//         include: {
//             model: TypeCommerce,
//         }
//     })
//     .then(commerces =>
//     {
//         if (!commerces || commerces.length === 0) {
//             req.flash("errors", "No commerces found for this type.");
//             return res.redirect("/home/index");
//         }
//         const commerceData = commerces.map(commerce => commerce.dataValues);

//         res.render("typecommerce/listcommerce", {
//             pageTitle: "Commerces",
//             typeActive: true,
//             commerces: commerceData,
//             searchQuery: searchQuery
//         });
//     })
//     .catch(err => {
//         console.error(err);
//         req.flash("errors", "Error while fetching");
//         res.redirect("/home/index");
//     });
// };

exports.GetCommercesByType = async (req, res, next) => {
    const typeId = req.params.typeId;
    const searchQuery = req.query.search || '';
    const userId = req.user ? req.user.id : null; // Obtén el ID del usuario desde la sesión

    try {
        // Encuentra todos los comercios que coincidan con el tipo y la búsqueda
        const commerces = await Commerce.findAll({
            where: {
                idTypeCommerce: typeId,
                name: {
                    [Op.like]: `%${searchQuery}%` // Filtra por nombre usando LIKE
                }
            },
            include: {
                model: TypeCommerce,
            }
        });

        if (!commerces || commerces.length === 0) {
            req.flash("errors", "No commerces found for this type.");
            return res.redirect("/home/index");
        }

        // Verifica si cada comercio está en la lista de favoritos del usuario
        const commerceData = await Promise.all(commerces.map(async commerce => {
            const isFavorite = userId ? await Favorite.findOne({
                where: {
                    userId: userId,
                    commerceId: commerce.id
                }
            }) : null;

            return {
                ...commerce.dataValues,
                isFavorite: !!isFavorite
            };
        }));

        // Enviar el valor de isFavorite como una variable de contexto para la vista
        res.render("typecommerce/listcommerce", {
            pageTitle: "Commerces",
            typeActive: true,
            commerces: commerceData,
            searchQuery: searchQuery,
        });
    } catch (err) {
        console.error(err);
        req.flash("errors", "Error while fetching");
        res.redirect("/home/index");
    }
};




exports.ToggleFavorite = (req, res, next) => {
    const commerceId = req.params.commerceId;
    const userId = req.session.user.id; 

    // Verificar si el favorito ya existe
    Favorite.findOne({
        where: {
            userId: userId,
            commerceId: commerceId
        }
    })
    .then(favorite => {
        if (favorite) {
            // El comercio ya está en la lista de favoritos, eliminarlo
            return Favorite.destroy({
                where: {
                    userId: userId,
                    commerceId: commerceId
                }
            });
        } else {
            // Agregar a favoritos
            return Favorite.create({
                userId: userId,
                commerceId: commerceId
            });
        }
    })
    .then(() => {
        req.flash("success", "Favorite status toggled.");
        res.redirect('back'); // Redirige a la página anterior
    })
    .catch(err => {
        console.error(err);
        req.flash("errors", "Error while toggling favorite status");
        res.redirect('back');
    });
};
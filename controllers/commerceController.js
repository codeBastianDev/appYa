const Commerces = require('../models/Commerce'); // Asegúrate de ajustar la ruta al modelo de comercio
const TypeCommerces = require('../models/TypeCommerce'); // Ajusta la ruta según tu estructura de archivos
const helper =  require("../utils/helper")
const Categories = require('../models/Category');
const Products = require('../models/Product');
const db = require('../contexts/cnx');
// Método para listar todos los comercios
exports.index = async (req, res) => {
    res.render('profile/commerce');
    // try {
    //     let result = await Commerces.findAll({
    //         include: [{ model: TypeCommerces }]
    //     });
    //     res.render('commerces/', { commerces: result.map(instance => instance.toJSON()) });
    // } catch (error) {
    //     console.error('Error al listar los comercios:', error);
    //     res.status(500).send('Error en el servidor');
    // }
};

// Método para renderizar la vista de guardar comercio
exports.save = async (req, res) => {
  
    var id = req.session.user.id;

    tipo = await TypeCommerces.findAll();
    if (id > 0) {
        try {
            let result = await Commerces.findOne({
                where: { id: id }
            });
            console.log(result.toJSON());
            res.render('profile/commerce',{profile: result.toJSON(),tipo:tipo.map(r => r.toJSON())});
        } catch (error) {      
            console.error('Error al obtener el comercio:', error);
            res.status(500).send('Error en el servidor');
        }
    } else {
        res.render('commerces/save', { commerce: {} });
    }
};

// Método para insertar o actualizar un comercio
exports.insert = async (req, res) => {
    let campo_photo = {};
    const { id, nombre, telefono, correo,  open, close, tipo } = req.body;
    if(req.file != undefined){
        photo = req.file
        photo = helper.saveImage(photo);
        campo_photo.photo = photo
    }else{
        campo_photo = null;
    }
    console.log(campo_photo)
    try {
            await Commerces.update({
                name:nombre,
                phone:telefono,
                mail:correo,
                openTime:open,
                closeTime:close,
                isActive:1,
                idTypeCommerce:2,
                ...campo_photo,
            }, {
                where: { id: 1 }
            });
            res.redirect("/comercios");
        } 
        
     catch (error) {
        console.error('Error al guardar el comercio:', error);
        res.status(500).send('Error en el servidor');
    }
    
};

// Método para eliminar un comercio
exports.delete = async (req, res) => {
    const id = req.body.id;
    try {
        await Commerces.destroy({
            where: { id: id }
        });
        res.redirect("/comercios");
    } catch (error) {
        console.error('Error al eliminar el comercio:', error);
        res.status(500).send('Error en el servidor');
    }
};


exports.listByCommerce = async (req, res) => {
    const commerceId = req.params.commerceId;
  
    try {
        const query = `SELECT 
                            p.id,
                            p.name,
                            p.description,
                            p.price,
                            p.photo,
                            c.name categoria
                        FROM products p  
                        LEFT JOIN 
                            categories c on c.id = p.categoryId
                        INNER JOIN 
                            commerces cm on cm.id = c.commerceId 
                            and p.commerceId = cm.id  
                        where cm.id = ${commerceId}`;
       let product = await db.query(query);
    
       let categorias = {};

       product[0].forEach(e => {
         if (!categorias[e.categoria]) {
           categorias[e.categoria] = [];
         }
         categorias[e.categoria].push(e);
       });
       
       const list_producto = Object.keys(categorias).map(categoria => {
         return {
           categoria: categoria,
           productos: categorias[categoria]
         };
       });
       
          
        // Renderizar la vista con la información del comercio y las categorías con productos
        res.render('home/commer_product',{list_producto});
    } catch (error) {
        console.error('Error al listar los productos del comercio:', error);
        res.status(500).send('Error en el servidor');
    }
};
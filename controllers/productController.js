const Products = require('../models/Product'); // Asegúrate de ajustar la ruta al modelo de producto
const Commerces = require('../models/Commerce'); // Ajusta la ruta según tu estructura de archivos
const Categories = require('../models/Category'); // Ajusta la ruta según tu estructura de archivos

const helper = require('../utils/helper')

// Método para listar todos los productos
exports.index = async (req, res) => {
    try {
        let result = await Products.findAll({
            include: [
                { model: Commerces },
                { model: Categories }
            ], where:{
                commerceId:req.session.user.id
            }
        });
        res.render('product/', { products: result.map(instance => instance.toJSON()) });
    } catch (error) {
        console.error('Error al listar los productos:', error);
        res.status(500).send('Error en el servidor');
    }
};

// Método para renderizar la vista de guardar producto
exports.save = async (req, res) => {
    var id = req.query.id;

    var categoria = await Categories.findAll({ where:{commerceId:req.session.user.id} })
    if (id > 0) {
        try {
            let result = await Products.findOne({
                where: { id: id }
            });
           
            res.render('product/save', { product: result.toJSON()  ,categories:categoria.map(c => c.toJSON()) });
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    } else {

        res.render('product/save', { categories: categoria.map(c => c.toJSON()) });
    }
};

// Método para insertar o actualizar un producto
exports.insert = async (req, res) => {
    const { id, nombre, descripcion, price,id_categoria} = req.body;
    
    if(req.file != undefined){
        photo = req.file
        photo = helper.saveImage(photo)
        campo_photo = {photo:photo}
    }else{
        campo_photo = null;
    }
  
    if (id > 0) {
        try {
            await Products.update({
                name:nombre,
                description:descripcion,
                price:price,
                commerceId:req.session.user.id,
                categoryId:id_categoria,
                campo_photo
            }, {
                where: { id: id }
            });
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    } else {
        try {
            await Products.create({
                photo:photo,
                name:nombre,
                description:descripcion,
                price:price,
                commerceId:req.session.user.id,
                categoryId:id_categoria
            });
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).send('Error en el servidor');
        }
    }
    res.redirect("/product");
};

// Método para eliminar un producto
exports.delete = async (req, res) => {
    const id = req.body.id;
    try {
        await Products.destroy({
            where: { id: id }
        });
        res.redirect("/product");
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send('Error en el servidor');
    }
};


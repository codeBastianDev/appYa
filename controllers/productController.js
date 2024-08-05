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
            ]
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
    var categoria = await Categories.findAll()
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
                commerceId:1,
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
                commerceId:1,
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



exports.listByCommerce = async (req, res) => {
    const commerceId = req.params.commerceId;
    try {
        // Buscar el comercio por su ID
        const commerce = await Commerces.findByPk(commerceId);

        // Verificar si se encontró el comercio
        if (!commerce) {
            return res.status(404).send('Commerce not found');
        }

        // Buscar las categorías asociadas a este comercio
        const categories = await Categories.findAll({
            where: { commerceId: commerceId },
            include: [{
                model: Products,
                required: true, // Solo incluir categorías que tengan productos
            }]
        });

        // Transformar los datos para el renderizado
        const categoriesWithProducts = categories.map(category => ({
            ...category.toJSON(), // Información de la categoría
            products: category.products.map(product => product.toJSON()) // Información de los productos
        }));

        // Renderizar la vista con la información del comercio y las categorías con productos
        res.render('product/catalog', { 
            commerce: commerce.toJSON(), // Información del comercio
            categories: categoriesWithProducts // Categorías con productos
        });
    } catch (error) {
        console.error('Error al listar los productos del comercio:', error);
        res.status(500).send('Error en el servidor');
    }
};


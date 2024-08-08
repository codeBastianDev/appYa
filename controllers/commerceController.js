const Commerces = require("../models/Commerce"); // Asegúrate de ajustar la ruta al modelo de comercio
const TypeCommerces = require("../models/TypeCommerce"); // Ajusta la ruta según tu estructura de archivos
const helper = require("../utils/helper");
const Categories = require("../models/Category");
const Products = require("../models/Product");
const Adrees = require("../models/Address");
const User = require("../models/User");
const db = require("../contexts/cnx");
const itbis = require("../models/Itbis");
const { where, Op, DATEONLY } = require("sequelize");
const order = require("../models/Order");
const orderDetalle = require("../models/OrderDetail");

// Método para listar todos los comercios
exports.index = async (req, res) => {
  res.render("profile/commerce");
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
  
    if (id > 0) {
      try {
        const types = await TypeCommerces.findAll();
        let result = await Commerces.findOne({
          where: { id: id },
        });
        console.log(result.toJSON());
  
        const profile = result.toJSON();
        const typesWithSelection = types.map((type) => ({
          ...type.toJSON(),
          selected: type.id === profile.idTypeCommerce,
        }));
  
        res.render("profile/commerce", {
          profile: profile,
          types: typesWithSelection,
        });
      } catch (error) {
        console.error("Error al obtener el comercio:", error);
        res.status(500).send("Error en el servidor");
      }
    } else {
      res.render("commerces/save", { commerce: {} });
    }
  };

// Método para insertar o actualizar un comercio
exports.insert = async (req, res) => {
    const { id, nombre, telefono, correo, open, close, tipo } = req.body;
    let campo_photo = {};
  
    if (req.file != undefined) {
      let photo = req.file;
      photo = helper.saveImage(photo);
      campo_photo.photo = photo;
    } else {
      campo_photo = null;
    }
  
    console.log(campo_photo);
  
    try {
      await Commerces.update(
        {
          name: nombre,
          phone: telefono,
          mail: correo,
          openTime: open,
          closeTime: close,
          isActive: 1,
          idTypeCommerce: tipo,
          ...campo_photo,
        },
        {
          where: { id: id },
        }
      );
      res.redirect("/profileComercio");
    } catch (error) {
      console.error("Error al guardar el comercio:", error);
      res.status(500).send("Error en el servidor");
    }
  };

// Método para eliminar un comercio
exports.delete = async (req, res) => {
  const id = req.body.id;
  try {
    await Commerces.destroy({
      where: { id: id },
    });
    res.redirect("/comercios");
  } catch (error) {
    console.error("Error al eliminar el comercio:", error);
    res.status(500).send("Error en el servidor");
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

    product[0].forEach((e) => {
      if (!categorias[e.categoria]) {
        categorias[e.categoria] = [];
      }
      categorias[e.categoria].push(e);
    });

    const list_producto = Object.keys(categorias).map((categoria) => {
      return {
        categoria: categoria,
        productos: categorias[categoria],
      };
    });

    // Renderizar la vista con la información del comercio y las categorías con productos
    res.render("home/commer_product", { list_producto });
  } catch (error) {
    console.error("Error al listar los productos del comercio:", error);
    res.status(500).send("Error en el servidor");
  }
};

exports.pagar = async (req, res) => {
  id = req.session.user.id;
  listado_producot = req.params.id_producto.split(",");

  result_itebis = await itbis.findAll();

  resul_producto = await Products.findAll({
    where: {
      id: {
        [Op.in]: listado_producot,
      },
    },
    include: [{ model: Commerces }],
  });

  resultAddresses = await Adrees.findAll({
    where: {
      userId: id,
    },
    include: [{ model: User }],
  });

  comercio = resul_producto[0].dataValues.commerce;
  res.render("home/pagar", {
    producto: resul_producto.map((r) => r.toJSON()),
    comercio: comercio.toJSON(),
    itbis: result_itebis[0].toJSON(),
    listado: req.params.id_producto,
    direccion: resultAddresses.map((r) => r.toJSON()),
  });
};

exports.readyPago = async (req, res) => {
  id = req.session.user.id;
  const { direccion, itebis, total, producto, comercio } = req.body;

  result_order = await order.create({
    userId: id,
    itbisId: itebis,
    status: 1,
    commerceId: comercio,
    addressId: direccion,
    total: total,
  });

  producto.split(",").forEach((p) => {
    (async () => {
      try {
        await orderDetalle.create({
          orderId: result_order.id,
          productId: p,
        });
      } catch (error) {
        console.error("Error al crear el detalle del pedido:", error);
      }
    })();
  });
  res.redirect("/order");
};

exports.orderViewCliente = async (req, res) => {
  id = req.session.user.id;
  orderID = req.params.id;

  var query = `SELECT 
                       concat( u.firstname,' ',u.lastname) name,
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
                    JOIN users u on u.id = o.userId
                    WHERE  o.id = ${orderID}`;

  result = await db.query(query);

  dato = {
    comercio: result[0][0].name ?? null,
    fecha: result[0][0].fecha ?? null,
    estado: result[0][0].estado ?? null,
  };
  res.render("commerce/order", { order: result[0].map((r) => r), dato: dato });
};

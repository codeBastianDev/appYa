const express = require('express')
const router = express.Router()
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const controllers = require("../controllers/commerceController")
const isAuth = require("../middlewares/is-auth")

// router.get('/profileComercio', controllers.index)
router.get('/profileComercio',isAuth, controllers.save)
router.post('/guardar_comercio',isAuth, upload.single('photo'),controllers.insert)
router.post('/delete_producto',isAuth, controllers.delete)


router.get("/commerce/:commerceId/products",controllers.listByCommerce);
router.get("/pagar/:id_producto",isAuth,controllers.pagar);
router.post("/pagar",isAuth,controllers.readyPago)
router.get('/orderDetalleCliente/:id',isAuth, controllers.orderViewCliente);


module.exports = router;

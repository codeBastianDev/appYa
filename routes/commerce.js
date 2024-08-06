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


module.exports = router;

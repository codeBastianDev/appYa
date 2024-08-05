const express = require('express')
const router = express.Router()
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const controllers = require("../controllers/productController")
const isAuth = require("../middlewares/is-auth")

router.get('/product',isAuth, controllers.index);
router.get('/guardar_producto',isAuth, controllers.save);
router.post('/guardar_producto',isAuth, upload.single('photo'),controllers.insert);
router.post('/delete_producto',isAuth, controllers.delete);
router.get("/commerce/:commerceId/products",controllers.listByCommerce);

module.exports = router;

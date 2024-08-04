const express = require('express')
const router = express.Router()
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const controllers = require("../controllers/productController")

router.get('/product', controllers.index)
router.get('/guardar_producto',controllers.save)
router.post('/guardar_producto',upload.single('photo'),controllers.insert)
router.post('/delete_producto',controllers.delete)

module.exports = router;

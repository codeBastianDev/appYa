const express = require('express')
const router = express.Router()
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const controllers = require("../controllers/commerceController")

// router.get('/profileComercio', controllers.index)
router.get('/profileComercio',controllers.save)
router.post('/guardar_comercio',upload.single('photo'),controllers.insert)
router.post('/delete_producto',controllers.delete)

module.exports = router;

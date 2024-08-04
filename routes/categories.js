const express = require('express')
const router = express.Router()

const controllers = require("../controllers/categoriesController")

router.get('/categoria', controllers.index)
router.get('/guardar_categoria',controllers.save)
router.post('/guardar_categoria',controllers.insert)
router.post('/delete_categoria',controllers.delete)

module.exports = router;

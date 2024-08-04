const express = require('express')
const router = express.Router()

const controllers = require("../controllers/categoriesController")
const isAuth = require("../middlewares/is-auth")

router.get('/categoria',isAuth, controllers.index)
router.get('/guardar_categoria',isAuth, controllers.save)
router.post('/guardar_categoria',isAuth, controllers.insert)
router.post('/delete_categoria',isAuth, controllers.delete)

module.exports = router;

const express = require('express');
const router = express.Router();
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const customerController = require("../controllers/customerController");
const isAuth = require("../middlewares/is-auth")

router.get('/profileCustomer',isAuth, customerController.GetProfile);
router.post('/save_customer',isAuth, upload.single('photo'),customerController.insert)
router.get("/customer/favorite",isAuth,customerController.GetFavorites);
router.post('/delete_favorite',isAuth, customerController.delete);
router.get('/order',isAuth, customerController.order);
router.get('/orderDetalle/:id',isAuth, customerController.orderView);

module.exports = router;
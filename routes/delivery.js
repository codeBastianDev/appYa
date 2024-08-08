const express = require("express");
const router = express.Router();
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const deliveriesController = require("../controllers/deliveryController");
const isAuth = require("../middlewares/is-auth");

router.get('/profileDelivery',isAuth, deliveriesController.GetProfile);
router.post('/updateProfile', isAuth, upload.single('photo'), deliveriesController.updateProfile);

module.exports = router;
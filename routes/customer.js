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

module.exports = router;
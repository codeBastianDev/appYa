const express = require('express');
const router = express.Router();
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const authController = require("../controllers/authController");
const isAuth = require("../middlewares/is-auth")

router.get('/login', authController.GetLogin);
router.post('/login', authController.PostLogin);
router.post('/logout',isAuth, authController.PostLogout);
router.get('/signup', authController.GetSignup);
router.post('/signup',upload.single('photo') ,authController.PostSignup);
router.get('/signupCommerce',upload.single('photo'), authController.GetSignupCommerce);
router.post('/signupCommerce',upload.single('photo') ,authController.PostSignupCommerce);

module.exports = router;
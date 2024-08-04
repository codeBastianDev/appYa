const express = require('express');
const router = express.Router();
// Subir imagen
const multer = require('multer');
const upload = multer({ dest: 'public/uploads' })
// Subir imagen

const authController = require("../controllers/authController");

router.get('/login', authController.GetLogin);
router.post('/login', authController.PostLogin);
router.post('/logout', authController.PostLogout);
router.get('/signup', authController.GetSignup);
router.post('/signup',upload.single('photo') ,authController.PostSignup);

module.exports = router;
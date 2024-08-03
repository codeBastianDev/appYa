const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");

router.get('/login', authController.GetLogin);
router.post('/login', authController.PostLogin);
router.post('/logout', authController.PostLogout);
router.get('/signup', authController.GetSignup);
router.post('/signup', authController.PostSignup);

module.exports = router;
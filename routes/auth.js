const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");

router.get('/login', authController.GetLogin);
router.post('/login', authController.PostLogin);
router.post('/logout', authController.PostLogout);

module.exports = router;
const express = require('express');
const router = express.Router();

const typecommerceController = require("../controllers/typecommerceController");
const isAuth = require("../middlewares/is-auth");

router.get("/listcommerce/:typeId",isAuth, typecommerceController.GetCommercesByType);

// Ruta para marcar un comercio como favorito
router.post("/favorite/:commerceId", isAuth, typecommerceController.ToggleFavorite);

module.exports = router;
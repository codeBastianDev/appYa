const express = require('express');
const path = require('path');
const router = express.Router();

const roleController = require("../controllers/roleController");

router.get("/mantRoles", roleController.GetAll);

module.exports = router;
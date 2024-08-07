const express = require("express");
const router = express.Router();

const addressesController = require("../controllers/addressesController");
const isAuth = require("../middlewares/is-auth");

router.get("/address", isAuth, addressesController.GetAddresses);
router.get("/address/create", isAuth, addressesController.CreateAddress);
router.post("/address/create", isAuth, addressesController.SaveAddress);
router.get("/address/edit/:id", isAuth, addressesController.EditAddress);
router.post("/address/edit/:id", isAuth, addressesController.UpdateAddress);
router.post("/address/delete/:id", addressesController.DeleteAddress);

module.exports = router;

const express = require('express');
const router = express.Router();

const adminsController = require("../controllers/adminsController");
const isAuth = require("../middlewares/is-auth");

router.get("/listcustomer",isAuth,adminsController.GetCustomers);
router.post('/toggle_customer_status', adminsController.ToggleCustomerStatus);
router.get("/listdelivery",isAuth,adminsController.GetDeliveries);
router.post('/toggle_delivery_status', adminsController.ToggleDeliveryStatus);
router.get('/listcommerce', adminsController.GetCommerces);
router.post('/toggle_commerce_status', adminsController.ToggleCommerceStatus);
router.get('/setting', adminsController.GetSetting);
router.get('/editsetting', adminsController.GetEditConfiguration);
router.post('/updatesetting', adminsController.UpdateConfiguration);
router.get("/listadmin", isAuth, adminsController.GetAdmins);
router.get('/editadmin/:id', isAuth, adminsController.GetEditAdmin);
router.post('/updateadmin', isAuth, adminsController.UpdateAdmin);
router.post('/toggle_admin_status', isAuth, adminsController.ToggleAdminStatus);


module.exports = router;
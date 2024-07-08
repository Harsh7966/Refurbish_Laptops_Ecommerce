const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin_controller");
const userAuthentication = require("../middlewares/user_auth");
const AdminAuth = require("../middlewares/admin_auth");
// const upload = multer();


// user api
router.route("/users").get( userAuthentication, AdminAuth,  controller.userdata);
router.route("/users/:id").get(userAuthentication, AdminAuth, controller.getUserById);
router.route("/users/delete/:id").delete(userAuthentication, AdminAuth, controller.deleteUserById);
router.route("/users/update/:id").patch(userAuthentication, AdminAuth, controller.updateUserData);

// product api
router.route("/products").get(userAuthentication, AdminAuth, controller.allProducts);
router.route("/products/:id").get(userAuthentication, AdminAuth, controller.getProductById);
router.route("/products/addProduct").post(userAuthentication, AdminAuth, controller.addProduct);
router.route("/products/delete/:id").delete(userAuthentication, AdminAuth, controller.deleteProduct);
router.route("/products/infoUpdate/:id").patch(userAuthentication, AdminAuth, controller.updateProductInfo);
router.route("/product/updatepImg/:id").patch(userAuthentication, AdminAuth, controller.updatepImg)

// category api
router.route("/category").get(userAuthentication, AdminAuth, controller.getAllCategory);
router.route("/category/:id").get(userAuthentication, AdminAuth, controller.getCategoryById);
router.route("/category/addCategory").post(userAuthentication, AdminAuth, controller.addCategory);
router.route("/category/delete/:id").delete(userAuthentication, AdminAuth, controller.deleteCategory);
router.route("/category/update/:id").patch(userAuthentication, AdminAuth, controller.updateCategory);

// dropdown api
router.route("/getAllDD").get(userAuthentication, AdminAuth, controller.getAllDropdown);
router.route("/dropdown/addDropdown").post(userAuthentication, AdminAuth, controller.addDropdownDetails);
router.route("/dropdown/deleteDropdown/:id").delete(userAuthentication, AdminAuth, controller.deleteDropdown);
router.route("/dropdown/:id").get(userAuthentication, AdminAuth, controller.getDropdownById);
router.route("/ddInfo/update/:id").patch(userAuthentication, AdminAuth, controller.updateDDInfo)
router.route("/dropdown/updateDDImg/:id").patch(userAuthentication, AdminAuth, controller.updateDDImg)

// contact api
router.route("/customer-query").get(userAuthentication, AdminAuth, controller.getAllCustomerQuery)
router.route("/customer-query/delete/:id").delete(userAuthentication, AdminAuth, controller.deleteCustomerQueryById)

// orders api
router.route("/allOrders").get(userAuthentication, AdminAuth, controller.allOrders);
router.route("/allOrders/delivered/:oID/:pID").patch(userAuthentication, AdminAuth, controller.orderDelivered);
router.route("/allOrders/delete/:oID/:pID").delete(userAuthentication, AdminAuth, controller.orderDelete);

module.exports= router;
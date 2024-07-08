const express = require("express");
const router = express.Router();
const controller = require("../controllers/user_controller");
const signUp_middle = require("../middlewares/signUp_middle");
const signUp_validator = require("../validator/signUp_validator");
const updatePassword = require("../middlewares/updatePassword_middle");
const updateValidator = require("../validator/updatePassword_validator");
const userAuthentication = require("../middlewares/user_auth");

router.route("/userAuth").get(userAuthentication, controller.userAuth);
router.route("/signup").post(signUp_middle(signUp_validator), controller.signup);
router.route("/login").post(controller.login);
router.route("/forgot-password").patch(updatePassword(updateValidator), controller.updatePassword);
router.route("/profile").get(userAuthentication, controller.profile);
router.route("/corporate-enquiries").post( controller.contact);

//product
router.route("/products").get(controller.allProducts);
router.route("/product-details/:pToken").get(controller.productDetails);
router.route("/product/delete/:id").delete(controller.deleteProductInCart);

// Cart
router.route("/cart").get(controller.getAllProductsInCart);

// Category
router.route("/category").get( controller.getAllCategory);
router.route("/category/:cToken").get(controller.getDropdownMenu);
router.route("/category/filterData/:id").get(controller.getFilteredProducts);

// dropdown api
router.route("/dropdown/:id").get(controller.getDropdownDetails);

// Orders api
router.route("/order-placed").post(userAuthentication, controller.orderPlaced);
router.route("/order-placed/buyItNow").post(userAuthentication, controller.BuyItNow);
router.route("/Myorders").get(userAuthentication, controller.Myorders);
router.route("/Myorders/cancle/:oID/:pID").patch(userAuthentication, controller.cancleOrder);

// create checkout api
router.route("/create_checkout_session").post(userAuthentication, controller.createCheckoutSession);

module.exports = router;

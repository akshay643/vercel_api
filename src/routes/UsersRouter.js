const express = require("express");
const auth = require("../middlewar/auth");
const router = new express.Router();
const user_controller = require("../controllers/UsersController");
router.route("/login_user").post(user_controller.loginuser);
router.route("/create_user").post(user_controller.createuser);
router.route("/google_user").post(user_controller.googleeuser);
router.route("/get_users").get(auth, user_controller.getusers);

module.exports = router;

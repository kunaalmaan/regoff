const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAdmin } = require("../middleware");
const userController = require("../controllers/user.controller");
// const ruleController = require("../controllers/rule.controller");
// const galController = require("../controllers/gallery.controller");

router.get("/", userController.getHome);
// router.get("/rules/:rule_id", ruleController.getOneRule);
// router.get("/gallery", galController.getGallery);
//router.get("/hostels/:hostel_id", userController.getOneHostel);

module.exports = router;

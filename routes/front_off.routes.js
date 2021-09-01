const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware");
const userController = require("../controllers/user.controller");
const front_offController = require("../controllers/front_off.controller");
// const front_ruleController = require("../controllers/rule.controller");
// const galController = require("../controllers/gallery.controller");

router.get("/", front_offController.getoff);

module.exports = router;

const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware");
const userController = require("../controllers/user.controller");
const front_frController = require("../controllers/front_fr.controller");
// const front_ruleController = require("../controllers/rule.controller");
// const galController = require("../controllers/gallery.controller");

router.get("/", front_frController.getfr);

module.exports = router;

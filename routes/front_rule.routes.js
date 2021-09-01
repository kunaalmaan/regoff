const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware");
const userController = require("../controllers/user.controller");
const front_ruleController = require("../controllers/front_rule.controller");
// const front_ruleController = require("../controllers/rule.controller");
// const galController = require("../controllers/gallery.controller");

router.get("/", front_ruleController.getrule);

module.exports = router;

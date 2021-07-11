const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/rule_pdf");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const ruleController = require("../controllers/rule.controller");
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, ruleController.getRules);

router.get("/add", isLoggedIn, isAdmin, ruleController.addRuleForm);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("rule"),
  ruleController.postRule
);

router.post(
  "/find",
  isLoggedIn,
  isAdmin,
  upload.single("rule"),
  ruleController.findRule
);

router.get("/:rule_id", ruleController.getEditForm);

router.get("/pdf/:rule_id", ruleController.getOneRule);

router.put(
  "/:rule_id",
  isLoggedIn,
  isAdmin,
  upload.single("rule"),
  ruleController.editRule
);

router.delete(
  "/:rule_id",
  isLoggedIn,
  isAdmin,
  ruleController.deleteRule
);

module.exports = router;

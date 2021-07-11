const express = require("express");
const router = express.Router();
const cregController = require("../controllers/curr_reg.controller");
const multer = require("multer");
const { isLoggedIn, isAdmin } = require("../middleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/curr_reg_images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, cregController.getCurr_reg);
router.get("/add", isLoggedIn, isAdmin, cregController.addCurr_regForm);
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  cregController.postCurr_reg
);
router.get("/:creg_id", isLoggedIn, isAdmin, cregController.getEditForm);
router.put(
  "/:creg_id",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  cregController.editCurr_reg
);
router.delete(
  "/:creg_id",
  isLoggedIn,
  isAdmin,
  cregController.deleteCurr_reg
);

module.exports = router;

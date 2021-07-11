const express = require("express");
const router = express.Router();
const offController = require("../controllers/official.controller");
const multer = require("multer");
const { isLoggedIn, isAdmin } = require("../middleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/official_images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, offController.getOfficial);
router.get("/add", isLoggedIn, isAdmin, offController.addOfficialForm);
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  offController.postOfficial
);
router.get("/:off_id", isLoggedIn, isAdmin, offController.getEditForm);
router.put(
  "/:off_id",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  offController.editOfficial
);
router.delete(
  "/:off_id",
  isLoggedIn,
  isAdmin,
  offController.deleteOfficial
);

module.exports = router;

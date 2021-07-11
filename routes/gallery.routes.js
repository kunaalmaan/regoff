const express = require("express");
const router = express.Router();
const galController = require("../controllers/gallery.controller");
const multer = require("multer");
const { isLoggedIn, isAdmin } = require("../middleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/gallery_images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, galController.getGallery);
router.get("/add", isLoggedIn, isAdmin, galController.addGalleryForm);
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  galController.postGallery
);
router.get("/:gal_id", isLoggedIn, isAdmin, galController.getEditForm);
router.put(
  "/:gal_id",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  galController.editGallery
);
router.delete(
  "/:gal_id",
  isLoggedIn,
  isAdmin,
  galController.deleteGallery
);

module.exports = router;

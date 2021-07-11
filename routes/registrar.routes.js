const express = require("express");
const router = express.Router();
const regController = require("../controllers/registrar.controller");
const multer = require("multer");
const { isLoggedIn, isAdmin } = require("../middleware");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/registrar_images");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.replace(/\s/g, "");
    cb(null, Date.now().toString() + fileName);
  },
});
const upload = multer({ storage: storage });

router.get("/", isLoggedIn, isAdmin, regController.getRegistrar);
router.get("/add", isLoggedIn, isAdmin, regController.addRegistrarForm);
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  regController.postRegistrar
);
router.get("/:reg_id", isLoggedIn, isAdmin, regController.getEditForm);
router.put(
  "/:reg_id",
  isLoggedIn,
  isAdmin,
  upload.single("pic"),
  regController.editRegistrar
);
router.delete(
  "/:reg_id",
  isLoggedIn,
  isAdmin,
  regController.deleteRegistrar
);

module.exports = router;

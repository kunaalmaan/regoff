const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAdmin, isLoggedIn } = require("../middleware");

const contactController = require("../controllers/contact.controller");

router.get("/", isLoggedIn, isAdmin, contactController.getContactInfo);

router.get(
  "/addContactInfo",
  isLoggedIn,
  isAdmin,
  contactController.addContactForm
);

router.delete("/:id", isLoggedIn, isAdmin, contactController.deleteContactInfo);

router.post(
  "/",
  isLoggedIn,
  isAdmin,
  contactController.createContactInfo
);

router.get(
  "/:id/updateContactInfo",
  isLoggedIn,
  isAdmin,
  contactController.updateContactForm
);

router.put(
  "/:id",
  contactController.updateContactInfo
);

router.delete(
  "/delete/allInfo",
  isLoggedIn,
  isAdmin,
  contactController.deleteAllInfo
);

module.exports = router;

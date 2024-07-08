const express = require("express");
const multer = require("multer");
const contactHandlers = require("../controllers/contactControllers");
const authControllers = require("../controllers/authControllers");

const upload = multer();

const router = express.Router();

router.post("/contact_us", upload.single("file"), contactHandlers.inquiryEmail);

router
  .route("/")
  .get(contactHandlers.getContactInfo)
  .post(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    contactHandlers.createContactInfo
  )
  .patch(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    contactHandlers.updateContactInfo
  )
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin"),
    contactHandlers.deleteContactInfo
  );

module.exports = router;

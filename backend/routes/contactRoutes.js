const express = require("express");
const contactHandlers = require("../controllers/contactHandlers");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/contact_us", contactHandlers.inquiryEmail);

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

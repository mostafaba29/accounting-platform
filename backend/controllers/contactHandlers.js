const Email = require("../utils/contact");
const factory = require("./FactoryHandlers");
const catchAsync = require("../utils/catchAsync");
const Contact = require("../models/contactModel");

exports.inquiryEmail = catchAsync(async (req, res) => {
  const { email, phone, subject, message } = req.body;

  // Validate the input
  if (!email || !phone || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Send the email
  const user = { email, phone };
  const emailInstance = new Email(user, subject, message);

  await emailInstance.send();

  res.status(200).json("Yout inquiry was sent successfully");
});

exports.createContactInfo = factory.createOne(Contact);
exports.getContactInfo = factory.getAll(Contact);

exports.updateContactInfo = catchAsync(async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "facebook",
    "x",
    "whatsapp",
    "phone",
    "email",
    "body",
    "members"
  ];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const contact = await Contact.findOne({});
  if (!contact) {
    return res.status(404).send({ error: "No contact found to update" });
  }

  updates.forEach(update => {
    contact[update] = req.body[update];
  });

  await contact.save();
  res.status(200).json(contact);
});

exports.deleteContactInfo = catchAsync(async (req, res) => {
  const contactInfo = await Contact.findOneAndDelete({});
  if (!contactInfo) {
    return res.status(404).send({ error: "No contact found to delete" });
  }
  res.status(200).json("Contact info deleted");
});

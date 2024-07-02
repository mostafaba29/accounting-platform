const express = require("express");
const multer = require("multer");

const router = express.Route();

const upload = multer({ dest: "uploads/" });

router.post("/api/v1/upload", upload.single("image"), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;

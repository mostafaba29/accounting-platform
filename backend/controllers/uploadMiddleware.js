const multer = require("multer");
const path = require("path");
const AppError = require("./../utils/appError");

//date format
const now = new Date();
const formattedDate = `${now.getDate()}-${now.getMonth() +
  1}-${now.getFullYear()}`;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, "./../frontend/public/imgs");
    } else if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype === "application/msword"
    ) {
      cb(null, "./../frontend/public/imgs");
    } else {
      cb(
        new AppError(
          "Unsupported file type! Please upload only images or excel and word files.",
          400
        ),
        false
      );
    }
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${formattedDate}-${file.originalname}`);
  }
});

// Filter to accept only certain file types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only image, video, and document files are allowed"));
};

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fieldNameSize: 500,
    fieldSize: 1024 * 1024 * 100
  }
});

module.exports = upload;

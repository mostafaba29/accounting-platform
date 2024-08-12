const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const Product = require("./../models/productModel");
const Blog = require("./../models/blogPostModel");
const upload = require("./uploadMiddleware");

exports.uploadFiles = upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "images", maxCount: 3 },
  { name: "video", maxCount: 1 },
  { name: "basic_version_document", maxCount: 1 },
  { name: "open_version_document", maxCount: 1 },
  { name: "editable_version_document", maxCount: 1 }
]);

const deleteFiles = files => {
  files.forEach(file => {
    fs.unlink(path.join("./../frontend/public/imgs", file), err => {
      if (err) console.error(`Failed to delete file: ${file}`, err);
    });
  });
};

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // Collect files to be deleted
    const filesToDelete = [];
    if (doc.coverImage) filesToDelete.push(doc.coverImage);
    if (doc.images) filesToDelete.push(...doc.images);
    if (doc.video) filesToDelete.push(doc.video);
    if (doc.basic_version_document && doc.basic_version_document_length > 0)
      filesToDelete.push(doc.basic_version_document);
    if (doc.open_version_document && doc.open_version_document.length > 0)
      filesToDelete.push(doc.open_version_document);
    if (
      doc.editable_version_document &&
      doc.editable_version_document.length > 0
    )
      filesToDelete.push(doc.editable_version_document);

    await Model.findByIdAndDelete(req.params.id);

    // Delete the files
    deleteFiles(filesToDelete);
    res.status(204).json({
      status: "success",
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    // Handle file uploads
    const { files } = req;
    const updatedData = { ...req.body };

    // Find existing document to delete old files
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    const filesToDelete = [];
    if (files) {
      if (files.coverImage) {
        if (doc.coverImage) filesToDelete.push(doc.coverImage);
        updatedData.coverImage = files.coverImage[0].filename;
      }
      if (files.images) {
        if (doc.images) filesToDelete.push(...doc.images);
        updatedData.images = files.images.map(file => file.filename);
      }
      if (files.video) {
        if (doc.video) filesToDelete.push(doc.video);
        updatedData.video = files.video[0].filename;
      }
      if (files.basic_version_document) {
        if (doc.basic_version && doc.basic_version.document)
          filesToDelete.push(doc.basic_version.document);
        updatedData.basic_version = {
          document: files.basic_version_document[0].filename
        };
      }
      if (files.open_version_document) {
        if (doc.open_version && doc.open_version.document)
          filesToDelete.push(doc.open_version.document);
        updatedData.open_version = {
          document: files.open_version_document[0].filename
        };
      }
      if (files.editable_version_document) {
        if (doc.editable_version && doc.editable_version.document)
          filesToDelete.push(doc.editable_version.document);
        updatedData.editable_version = {
          document: files.editable_version_document[0].filename
        };
      }
    }

    const updatedDoc = await Model.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true
      }
    );

    // Delete old files
    deleteFiles(filesToDelete);

    res.status(200).json({
      status: "success",
      data: {
        data: updatedDoc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const { files } = req;
    const newData = { ...req.body };
    if (files) {
      if (files.coverImage && files.coverImage.length > 0) {
        newData.coverImage = files.coverImage[0].filename;
      }
      if (files.images && files.images.length > 0) {
        newData.images = files.images.map(file => file.filename);
      }
      if (files.video && files.video.length > 0) {
        newData.video = files.video[0].filename;
      }
      if (
        files.basic_version_document &&
        files.basic_version_document.length > 0
      ) {
        newData.basic_version.document =
          files.basic_version_document[0].filename;
      }
      if (
        files.open_version_document &&
        files.open_version_document.length > 0
      ) {
        newData.open_version.document = files.open_version_document[0].filename;
      }
      if (
        files.editable_version_document &&
        files.editable_version_document.length > 0
      ) {
        newData.editable_version.document =
          files.editable_version_document[0].filename;
      }
    }
    const doc = await Model.create(newData);

    res.status(201).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    let query;

    if (mongoose.Types.ObjectId.isValid(id)) {
      query = Model.findById(id);
    } else {
      query = Model.findOne({ slug: id });
    }

    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    if (!doc || doc.length === 0) {
      return next(new AppError("Data not found", 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

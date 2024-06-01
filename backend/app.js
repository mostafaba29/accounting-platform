const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorConrollers");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

//security middlewares
app.use(helmet()); //Set security HTTP headers
app.use(mongoSanitize()); //Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(hpp()); // prevent parameter pollution

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/products", productRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

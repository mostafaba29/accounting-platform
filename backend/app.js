const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("./controllers/passport");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorConrollers");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const productRoutes = require("./routes/productRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
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

// Initialize Passport and session middleware
// app.use(
//   cookieSession({
//     secret: process.env.SESSION_SECRET || "random-session-secret",
//     resave: false,
//     saveUninitialized: false
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", googleAuthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/products", productRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

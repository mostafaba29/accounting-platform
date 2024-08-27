const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorConrollers");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const productRouter = require("./routes/productRoutes");
const googleAuthRouter = require("./routes/googleAuthRoutes");
const consultationRouter = require("./routes/consultationRoutes");
const analysisRouter = require("./routes/analysisRoutes");
const contactRouter = require("./routes/contactRoutes");
const membersRouter = require("./routes/membersRoutes");
const packageRouter = require("./routes/packageRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const clientRouter = require("./routes/clientRoutes");
const cartRouter = require("./routes/cartRoutes");
const termsAndConditionsRouter = require("./routes/termsAndConditionsRoutes");
const privacyPolicyRouter = require("./routes/privacyPolicyRoutes");
const aboutUsRouter = require("./routes/aboutUsRoutes");
const landingContentRouter = require("./routes/landingPageContentRoutes");

const app = express();

app.use(morgan("dev"));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Limit requests from same API
const apiLimiter = rateLimit({
  max: 600,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!"
});

app.use("/api", apiLimiter);

//security middlewares
app.use(helmet()); //Set security HTTP headers
app.use(mongoSanitize()); //Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS
app.use(hpp()); // prevent parameter pollution

app.use("/auth", googleAuthRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/consults", consultationRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/content", analysisRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/members", membersRouter);
app.use("/api/v1/packages", packageRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/termsAndConditions", termsAndConditionsRouter);
app.use("/api/v1/privacyPolicy", privacyPolicyRouter);
app.use("/api/v1/aboutUs", aboutUsRouter);
app.use("/api/v1/landingContent", landingContentRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);

module.exports = app;

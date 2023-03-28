const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const authRouter = require("./Routes/auth");
const cookieParser = require("cookie-parser");
const gigRouter = require("./Routes/gig");
const userRouter = require("./Routes/user");
const reviewRouter = require("./Routes/review");
const ordersRouter = require("./Routes/orders");
const convoRouter = require("./Routes/conversation");
const messageRouter = require("./Routes/message");
const corsOptions = require("./config/corsOptionjs");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("err in mongo connection:", error);
  }
};

// app.use(
//   cors({
//     origin: "https://fiverr-nqn3knyfz-veer260.vercel.app/",
//     credentials: true,
//   })
// );

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",

    "https://fiverr-amber.vercel.app"
    // "http://localhost:5173"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/gigs", gigRouter);

app.use("/api/users", userRouter);

app.use("/api/reviews", reviewRouter);

app.use("/api/orders", ordersRouter);

app.use("/api/conversations", convoRouter);

app.use("/api/messages", messageRouter);

app.use("/", (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong";
  res.status(statusCode).json(message);
});

app.listen(8800, async () => {
  await connectDB();
  console.log("connected to atlas");
});

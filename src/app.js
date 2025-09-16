const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const connectDB = require("./config/database");

const app = express();

const corsOptions = {
  origin: "https://dev-connect-client-mu.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database Connected successfully");
    app.listen(process.env.VITE_PORT, () => {
      console.log(
        `server successfully listening on port ${process.env.VITE_PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Database Connection Unsuccessful");
  });

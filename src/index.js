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

// ✅ Correct CORS options
const corsOptions = {
  origin: [
    "https://dev-connect-client-mu.vercel.app", // your frontend
    "http://localhost:5173", // local dev (Vite default)
  ],
  credentials: true, // allow cookies/headers
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// DB connection
connectDB()
  .then(() => {
    console.log("Database Connected successfully");
    const PORT = process.env.VITE_PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Unsuccessful", err);
  });

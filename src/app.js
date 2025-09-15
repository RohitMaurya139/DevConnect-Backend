// Import Express for building the web server
const express = require("express");
require("dotenv").config();
// Import application routers for authentication, profile, and requests
const authRouter = require("./routes/auth"); // Handles routes like /signup, /login
const profileRouter = require("./routes/profile"); // Handles profile-related routes
const requestRouter = require("./routes/request"); // Handles request-related routes
const cors=require("cors")
// Import middleware to parse cookies from HTTP requests
const cookieParser = require("cookie-parser");

// Import the custom function to connect to MongoDB
const connectDB = require("./config/database");
const userRouter = require("./routes/user");
// Create an Express application instance
const app = express();
app.use(
  cors({
    origin:
      "https://dev-connect-client-git-main-rohit-mauryas-projects-3de2febd.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Add middleware to parse JSON bodies from incoming API requests
app.use(express.json());

// Add middleware to parse cookies from incoming API requests
app.use(cookieParser());

// Mount authentication router at root path; handles endpoints like /signup and /login
app.use("/", authRouter);

// Mount profile router at root path; handles endpoints like /profile, /edit-profile
app.use("/", profileRouter);

// Mount request router at root path; handles endpoints like /request, /friend-request
app.use("/", requestRouter);
app.use("/", userRouter);

// Connect to MongoDB, then start the server on port 3000 upon successful connection
connectDB()
  .then(() => {
    console.log("Database Connected successfully");
    // Start listening for incoming requests on port 3000
    app.listen(process.env.VITE_PORT, () => {
      console.log(`server successfully listening on port ${process.env.VITE_PORT}`);
    });
  })
  .catch((err) => {
    // Log error if connection to database fails
    console.error("Database Connection Unsuccessful");
  });

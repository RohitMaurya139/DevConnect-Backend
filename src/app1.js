const express = require("express")
const app = express();

// app.use(
//   "/user",
//   (req, res, next) => {
//     // res.send("route handler 1")
//     console.log("route handler 1");
//     next();
//   },
//   (req, res, next) => {
//     //  res.send("route handler 2");
//     console.log("route handler 2");
//     next();
//   },
//   (req, res, next) => {
//     // res.send("route handler 3");
//     console.log("route handler 3");
//     next();
//   },
//   (req, res, next) => {
//     // res.send("route handler 4");
//     console.log("route handler 4");
//     next();
//   },
//   (req, res, next) => {
//     res.send("route handler 5");
//     console.log("route handler 5");
    
//   });
 app.use("/user", (req, res, next) => {
//    res.send("route handler 2");
     console.log("route handler 2");
     next();
 });
app.use("/user", (req, res, next) => {
    res.send("route handler 1")
    console.log("route handler 1");
    // next();
})
 
app.listen(2000, () => {
  console.log("server successfully listening on port 2000");
});
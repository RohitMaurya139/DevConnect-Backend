const express = require("express")
const app = express();
const { AdminAuth, UserAuth } = require("./middlewares/auth");

app.use("/admin", AdminAuth)
app.use("/user", UserAuth);
app.get("/admin/getAllData", (req, res, next) => {
        res.send("All Data send");   
 });
 app.get("/admin/deleteUser", (req, res, next) => {
   res.send("Delete a user");
 });
app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  // console.log(req.query)
  res.send({
    firstName: "Rohit",
    lastName: "Maurya",
    email: "rohit139maurya@gmail.com", // 
  });
});

app.post("/user/login", (req, res) => {

  res.send("User successfully logged in");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully from database");
});

 app.listen(7777, () => {
   console.log("server successfully listening on port 7777");
 });
 const AdminAuth = (req, res, next) => {
  console.log("Admin Auth getting checked");
  const token = "xyz";
  const isAdminAuthorize = token === "xyz";
  if (!isAdminAuthorize) {
    res.status(401).send("UnAuthorize Request");
  } else {
    next();
  }
};
 const UserAuth = (req, res, next) => {
   console.log("User Auth getting checked");
   const token = "xyz";
   const isAdminAuthorize = token === "xyz";
   if (!isAdminAuthorize) {
     res.status(401).send("UnAuthorize Request");
   } else {
     next();
   }
 };
module.exports = { AdminAuth, UserAuth };

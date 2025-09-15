const jwt = require("jsonwebtoken");
 const User=require("../model/user")
 const UserAuth = async (req, res, next) => {
   try {
     const { token } = req.cookies;
     if (!token) {
       throw new Error("Token is Invalid !!! Please login again")
     }
     const decodeObj = await jwt.verify(token, process.env.VITE_JWT_SECRET);
     const { _id } = decodeObj
     const user = await User.findById(_id)
     if (!user) {
       throw new Error("User Not Exist")
     }
     req.user = user
     next()
   } catch (err) {
     res.status(400).send("ERROR : "+err.message)
  }
 };
module.exports =  UserAuth ;

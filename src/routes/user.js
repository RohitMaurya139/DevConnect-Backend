const express = require("express");
const UserAuth = require("../middlewares/auth");
const connectionRequest = require("../model/connectionRequest");
const User = require("../model/user");
const userRouter = express.Router();


userRouter.get("/user/request/received", UserAuth, async (req, res) => {
    try {
        const loggedUser = req.user;
      const newConnectionRequest = await connectionRequest.find({
            
            toUserId: loggedUser._id,
            status: "interested"
        }).populate("fromUserId","FirstName LastName age gender skills profileImg")
      const Data = newConnectionRequest.map((row) =>  row );
        (newConnectionRequest.length === 0
          ? res.json({
              message: "No Pending connection request",
              
            })
          : res.json({
              message: "Pending connection request fetched successfully",
              data: Data,
            }))
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)

    }
})
userRouter.get("/user/request/connection", UserAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const newConnectionRequest = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedUser._id, status: "accepted" },
          { fromUserId: loggedUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", "FirstName LastName age gender skills profileImg");
      const Data = newConnectionRequest.map(row => {
          if (row.fromUserId.toString() === loggedUser._id.toString()) {
              return row.toUserId;
          }
         return row.fromUserId
      })
    res.json({
      message: `${loggedUser.FirstName}, Your DevConnect Connection`,
      data: Data,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/feed", UserAuth,async(req, res)=> {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit;
    const skip = (page - 1) * limit;
    const hideConnectionRequest = await connectionRequest
      .find({
        $or: [
          {
            fromUserId: loggedInUser._id,
            status: "interested",
          },
          { toUserId: loggedInUser._id, status: "interested" },
          {
            fromUserId: loggedInUser._id,
            status: "ignored",
          },
          { toUserId: loggedInUser._id, status: "ignored" },
          {
            fromUserId: loggedInUser._id,
            status: "accepted",
          },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .select("fromUserId toUserId status")
      .populate("fromUserId", "FirstName")
      .populate("toUserId", "FirstName");
    const hideUserFromFeed = new Set();
    hideConnectionRequest.forEach((req) => {
      // Works for both ObjectId and populated object
      hideUserFromFeed.add(
        req.fromUserId._id
          ? req.fromUserId._id.toString()
          : req.fromUserId.toString()
      );
      hideUserFromFeed.add(
        req.toUserId._id ? req.toUserId._id.toString() : req.toUserId.toString()
      );
    })


  const user = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUserFromFeed) } },
      { _id: { $ne: loggedInUser._id } },
    ],
  }).select("FirstName LastName age gender skills profileImg").skip(skip).limit(limit);


res.send(user)

  } catch (err) {
    res.status(400).send("ERROR : "+err.message)
  }
})
module.exports=userRouter

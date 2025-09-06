const express = require("express")
const requestRouter = express.Router();
const UserAuth=require("../middlewares/auth")
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user")

requestRouter.post("/request/send/:status/:toUserId", UserAuth, async (req, res,next) => {
    try {
        const fromUserId = req.user._id;
      const { status, toUserId} = req.params;
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message:"Invalid status type : "+status})
        }
        const toUser = await User.findById(toUserId)
        if (!toUser) {
              return res.status(400).json({message:"User not Found!!!"})
        }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
        if (existingConnectionRequest) {
            throw new Error("Connection Request Already Sent")
        }
        const  NewConnectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });


        const data = await NewConnectionRequest.save();
        res.json({
          message: `${req.user.FirstName} sent Request to ${toUser.FirstName}`,
          data,
        });
    } catch (err) {
        res.status(400).send("ERROR : "+ err.message)
}
});

requestRouter.post("/request/review/:status/:requestId", UserAuth, async (req, res) => {
  try {
    const loggedUser = req.user
  const { status, requestId } = req.params
  const allowedStatus = ["accepted", "rejected"];
  const isAllowedStatus = allowedStatus.includes(status)
  if (!isAllowedStatus) {
    res.status(400).json({ message: "Invalid status" })
  }
  const newConnectionRequest = await ConnectionRequest.findOne({
    _id: requestId,
    toUserId: loggedUser._id,
    status: "interested"
  })
  if (!newConnectionRequest) {
    res.status(400).json({ message: "Invalid Connection Request" });
  }
  newConnectionRequest.status = status
  const data = await newConnectionRequest.save();
  res.json({ message: "Connection Request " + status, data })
  } catch (err) {
    res.status(400).send("ERROR : "+  err.message)
}
})
module.exports = requestRouter;
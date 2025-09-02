const express = require("express")
const profileRouter = express.Router();
const UserAuth=require("../middlewares/auth")
const {
  validateProfileEditData,
  validateProfilePasswordEdit,
} = require("../utils/validation");
const bcrypt = require("bcryptjs");
profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {
    // Send user profile data
    const user =req.user
      res.send(user);
    
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  try {
    validateProfileEditData(req)
    const loggedInUser = req.user
  
    Object.keys(req.body).forEach((key) => 
        loggedInUser[key] = req.body[key]
    )
    await loggedInUser.save();

    res.send(`${loggedInUser.FirstName}, Your Profile Updated SuccessFully`);
  } catch (err) {
    res.status(400).send("Error : "+ err.message)
  }
})
profileRouter.patch("/profile/password", UserAuth, async (req, res) => {
  try {
    // Await async validation which returns new password string
    const passwordEdit = await validateProfilePasswordEdit(req);

    const loggedInUser = req.user;

    // Hash new password
    const passwordHash = await bcrypt.hash(passwordEdit, 10);

    // Update password field correctly
    loggedInUser.password = passwordHash;

    // Persist changes in DB
    await loggedInUser.save();

    res.send(`${loggedInUser.FirstName}, Your Password Updated Successfully`);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
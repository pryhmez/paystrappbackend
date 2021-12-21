const router = require("express").Router();
const authController = require("../controllers/authController");
const checkAuth = require('../middleWares/checkAuth');

// const {
//   signUpValidation,
//   loginValidation
// } = require("../middleWares/userValidation");

module.exports = function() {
  var authCtl = new authController();

  router.post("/signup", authCtl.signUp);
  router.post("/signin", authCtl.signIn);
  router.post("/getuserprofile", authCtl.getUserProfile)
  router.post('/settransactionpin', authCtl.setTransactionPin);
  router.post("/verifyemail", authCtl.sendVerification);
  router.post("/emailconfirm", authCtl.emailTokenConfirmation)
  router.post("/verifyphone", )

  return router;
};

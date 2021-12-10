const router = require("express").Router();
const transactionController = require('../controllers/transactionController');
const checkAuth = require('../middleWares/checkAuth');
const checkPin = require('../middleWares/checkPin');


module.exports = function() {
  var transCtl = new transactionController();

  router.post("/updatebank", transCtl.updateBank);
  router.post("/getaccount", transCtl.getAccount);
  router.post("/airtimepurchase", checkPin, transCtl.buyAirtime );
  router.post("/changetransactionpin", checkPin, transCtl.setTransactionPin)


  return router;
};

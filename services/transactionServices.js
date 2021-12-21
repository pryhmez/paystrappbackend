const userModel = require("../models/user");
const accountModel = require("../models/account");
const secretCodeModel = require("../models/secretCodeModel");

const updateBankDetails = async function (data, hash) {
  let user = await userModel.findOne({ _id: data.userId });
  if (user) {
    const newAccount = await new accountModel({
      userId: data.userId,
      transactionPin: user.transactionPin,
      email: user.email,
      accountName: data.accountName,
      accountNo: data.accountNo,
      bank: data.bank,
    });
    return newAccount.save();
  } else {
    return "user does not exist";
  }
};

const getAccountDetails = async function (userId) {
  let user = await accountModel.findOne({ userId });

  return user;
};

const buyAirtime = async function (userData, resData) {
  console.log(userData, resData);
  const transaction = await accountModel.updateOne(
    {
      userId: userData.userId,
    },
    {
      $push: {
        transactionLog: {
          type: "airtime",
          details: { ...resData, ...userData },
          amount: userData.amount,
          walletBalanceAfter: "20000",
        },
      },
    }
  );

  return transaction;
};

const setUserTransactionPin = async function (data, pinHash) {
  const user = await userModel.findOneAndUpdate(
    { email: data.email },
    { transactionPin: pinHash },
    { new: true }
  );

  const account = await accountModel.findOneAndUpdate(
    { email: data.email },
    { transactionPin: pinHash },
    { new: true }
  );

  return await user;
};

const modifyWalletBalance = async function (data, action) {
  let wallet = await userModel.findOne({ _id: data.userId });
  if (wallet) {
    let amount = parseFloat(wallet.accountBalance) + parseFloat(data.value);
    console.log(parseFloat(wallet.accountBalance))

    const user = await userModel.findOneAndUpdate(
      { _id: data.userId },
      { accountBalance: amount },
      { new: true }
    );

    const account = await accountModel.findOneAndUpdate(
      { userId: data.userId },
      { walletBalance: amount },
      { new: true }
    );

    return await user;
  } else {
    return "user does not exist";
  }

};

module.exports = {
  updateBankDetails,
  getAccountDetails,
  buyAirtime,
  setUserTransactionPin,
  modifyWalletBalance,
};

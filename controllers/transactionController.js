const bcrypt = require("bcrypt");
const axios = require("axios");
// const nodemailer = require("nodemailer");
// const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");

const { updateBankDetails, getAccountDetails, buyAirtime, setUserTransactionPin } = require("../services/transactionServices");
const { response } = require("express");
// const { sendVerificationMail } = require("../config/nodemailer");

module.exports = function dataController() {
  //registers a student
  this.updateBank = (req, res, next) => {
    updateBankDetails(req.body)
      .then((result) => {
        if (result !== "user does not exist") {
          res.status(200).send({
            success: true,
            entry: req.body,
            data: result,
          });
        } else {
          res.status(401).send({
            success: false,
            entry: req.body,
            data: result,
          });
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(400).send({
          success: false,
          data: err,
        });
      });
  };

  this.getAccount = (req, res, next) => {
   getAccountDetails(req.body.userId)
     .then((result) => {
         res.status(200).send({
           success: true,
           entry: req.body,
           data: result,
         });
   
     })
     .catch((err) => {
       console.log(err);

       res.status(400).send({
         success: false,
         entry: req.body,
         data: err,
       });
     });
 };

 this.buyAirtime = (req, res, next) => {

   const params = new URLSearchParams();
   params.append('operator', req.body.provider);
   params.append('type', 'airtime');
   params.append('value', req.body.amount);
   params.append('phone', req.body.phone);

   axios.post()

   axios
   .post(
     'https://api.mobilevtu.com/v1/MAnsKL9byXCiQ48yFPjxOSUNruUH/topup',
     params,
     {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Api-Token': `EqGBn90bqtSgaqMAjJGOyrfgRysL`,
         'Request-Id': '34232',
       },
     },
   )
   .then(response => {
      
      if (response.status == 200) {
         

         buyAirtime(req.body, response.data).then((result) => {


            
            res.status(200).send({
               successful: true,
               message: response.data,
               data: result
            })
         })
     } 
   })
   .catch(err => {});
 }

 this.setTransactionPin = (req, res, next) => {
    if (req.body.newPin) {

       bcrypt.hash(req.body.newPin, 10, (err, hash) => {
          setUserTransactionPin(req.body, hash).then((result) => {
             //  console.log(result);
             if (result) {
                res.status(200).send({
                   successful: true,
                   message: "Transaction Pin added successfully",
                   data: result,
                  });
               }else {
                  res.status(400).send({
                     success: false,
                     message: "Something went wrong",
                     data: result
                  })
               }
            });
         });
      } else {
         console.log('req.body.newPin, hash')

         res.status(200).send({
            success: false,
            message: "Something went wrong, no pin was inputed",
            // data: result
         })
      }
 };


};

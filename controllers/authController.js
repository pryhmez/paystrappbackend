const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const {
  signUpUser,
  getAll,
  signInUser,
  setUserTransactionPin,
  sendVerification,
  emailTokenConfirmation
} = require("../services/authServices");
const { sendVerificationMail } = require("../config/nodemailer");

module.exports = function dataController() {
  //registers a student
  this.signUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      signUpUser(req.body, hash)
        .then((result) => {
          res.send({
            success: true,
            entry: req.body,
            data: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({
            success: false,
            data: err,
          });
        });
    });
  };

  this.signIn = (req, res, next) => {
    signInUser(req.body)
      .then((user) => {
        if (!user) {
          // return next(new AppError('Email does not exist in our Database, please sign up', 401));
          res
            .status(401)
            .send({
              successful: false,
              message: "Email does not exist in our Database, please sign up",
              data: req.body.email,
            })
            .end();
          return;
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            // return next(new AppError(errors, 401));
            res.status(401).send(errors.errors);
          } else if (err) {
            // return next(new AppError(err, 401));
            res.status(401).send(err);
          } else if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
                emailVerified: user.emailVerified,
                phoneVerified: user.phoneVerified,
              },
              process.env.JWTSECRET,
              {
                expiresIn: "4h",
              }
            );
            // let userData = Object.assign({}, user);
            res.status(200).json({
              status: true,
              message: "login successful",
              token: token,
              user: user,
            });
          } else {
            // return next(new AppError('login failed, please enter correct Username and password', 401));
            res.status(402).send({
              successful: false,
              message:
                "login failed, please enter correct Username and password",
              data: req.body.email,
            });
          }
        });
      })
      .catch((error) => {
        // return next(new AppError(error, 500));
        res.status(500).send(error);
      });
  };

  this.sendVerification = (req, res, next) => {
    let val = Math.floor(100000 + Math.random() * 900000);
    console.log(val, req.body);

    // console.log(process.env.LOGO)

	 if(req.body.email) {

		 sendVerificationMail(req.body.email, val);
	 }

    sendVerification(req.body.email, val)
      .then((result) => {
        res.status(200).send({
          success: true,
          message: "verification Email sent successfully",
          data: result,
        });
      })
      .catch((error) => {
        res.status(400).send({
          success: false,
          message: "could not send email",
          data: req.body,
          err: error,
        });
      });
  };

  this.emailTokenConfirmation = (req, res, next) => {

		emailTokenConfirmation(req.body.email, req.body.code).then(
			result => {
				if(result == "Wrong token entered") {
					res.status(201).send({
						success: false,
						message: result
					})
				} else {
				
					res.status(200).send({
						success: true,
						message: "verification successful"
					})
				}
			}
		)

  };

  this.setTransactionPin = (req, res, next) => {
    bcrypt.hash(req.body.pin, 10, (err, hash) => {
      setUserTransactionPin(req.body, hash).then((result) => {
        console.log(result);
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
  };

};

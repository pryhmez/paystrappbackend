const userModel = require('../models/user');
const secretCodeModel = require('../models/secretCodeModel');


const signUpUser = async function(userData, hash) {
    // let user  =  await userModel.findOne({ email: userData.email });
    // if (user) {
    //     console.log(user)
    //     return null
    // };
 
    const newUser = await new userModel(
        {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            password: hash
        });
        return newUser.save();
}

const signInUser =  function (userData) {
    const user =  userModel.findOne({email: userData.email});
    return user
}

const setUserTransactionPin = async function (data, pinHash) {
    
    const user = userModel.findOneAndUpdate(
        {email: data.email},
        {transactionPin: pinHash},
        {new: true}
    );

    return user;
}



const sendVerification = async function (email, emailToken) {

    const code = await secretCodeModel.findOne({ email: email });
    // console.log(code);
  
    if (code) {
      await secretCodeModel.findOneAndUpdate(
        { email },
        // { $set: { "code": "43423y298hirpobigpoiebgiorg"} },
        { $set: { "code": emailToken } },
        { new: true }
      )
      console.log('already sent one');
      return await 'already sent code'
    } else {
  
      let secretCode = await new secretCodeModel({
  
        email: email,
        code: emailToken
  
      });
  
      return secretCode.save();
    }
  };



const emailTokenConfirmation = async function(email, code){
    console.log(email, code)
   const authToken  = await secretCodeModel.findOne({ email});
   
   if(authToken) {
       if(authToken.code != code) {
           return "Wrong token entered"
       }

       if(authToken.code == code) {

        const user = await userModel.findOneAndUpdate({email}, {$set: {"emailVerified": true}}, {new: true});
        console.log(user);

        return user; 
           
       }
   }

   if(!authToken) {

       return "token expired"
   }
       
}

const confirmSignUp = function( token ) {
    return tokenModel.findOne({ token })
}

module.exports = {
    signUpUser,
    signInUser,
    setUserTransactionPin,
    emailTokenConfirmation,
    confirmSignUp,
    sendVerification
}
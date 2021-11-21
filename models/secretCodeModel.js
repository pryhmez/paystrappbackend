var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SecretCodeSchema = new Schema({

    //secret code
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    confirmed: {
        type: String,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        expires: 6000,
    },

})

module.exports = mongoose.model('SecretCode', SecretCodeSchema)

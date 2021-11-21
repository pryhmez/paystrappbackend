var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TimeSlotSchema = new Schema({

    //secret code
    userId: {
        type: String,
        required: true,
    },
    slots: {
        type: Array,
        required: true,
    },
    recieved: {
        type: String,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        expires: 86400,
    },
    ourDate: {
        type: String
    }

})

module.exports = mongoose.model('TimeSlots', TimeSlotSchema)

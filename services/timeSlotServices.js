var mongoose = require("mongoose");

const userModel = require("../models/user");
const timeSlotModel = require("../models/timeSlots");

const ObjectId = mongoose.Types.ObjectId;

var d = new Date();
var day = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();

function generate(activeTime, inactiveTime, thecount) {
  let timeslot = [];
  var r1 = [];
  var r2 = [];
  var currsum1 = 0;
  var currsum2 = 0;
  for (var i = 0; i < thecount - 1; i++) {
    var val1 = randombetween(1, activeTime - (thecount - i - 1) - currsum1);
    var val2 = randombetween(1, inactiveTime - (thecount - i - 1) - currsum2);

    if (val1 > 7000 || val2 > 13000 || val1 < 300 || val2 < 500) {
        i = i -1
        console.log(val1, val2, i);
    } else {

          r1[i] = val1;
          timeslot.push(val1);
  
          r2[i] = val2;
          timeslot.push(val2);
 
    
        currsum1 += r1[i];
        currsum2 += r2[i];
        
    }

  }
  r1[thecount - 1] = activeTime - currsum1;
  r2[thecount - 1] = inactiveTime - currsum2;
  timeslot.push(activeTime - currsum1);
  timeslot.push(inactiveTime - currsum2);
  return timeslot;
}

function randombetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//saves any message that is being handled to the database
const getTimeSlot = async ({ userId }) => {
  //  console.log(userId);

  const slot = await timeSlotModel.findOne({ userId });

  if (slot) {
    // console.log(new Date(86400 * 1000).toISOString().substr(11, 8));
    return slot;
  } else {
    //   console.log("the student exists");

    //   const record = await attendanceModel.findOne({ recordDate: month + " " + day + " " + year });

    const timeSlot = await new timeSlotModel({
      userId,
      slots: generate(28800, 57600, 8),
      ourDate: Date.now(),
    });

    // console.log(student);

    await timeSlot.save();

    return timeSlot;
  }
};

const createTimeSlot = async (data) => {
  if (data.date) {
    console.log("there is date");
    const record = await attendanceModel.findOne({ recordDate: data.date });

    // let id = await record.record[].cardNo;

    return await record;
  } else {
    console.log("there is no date");

    const record = await attendanceModel.findOne({
      recordDate: month + " " + day + " " + year,
    });

    // try(

    // )catch(e){}

    // console.log(out);
    let result = await Promise.all(
      record.record.map(async (item, i) => {
        let container = {};

        let student = await studentModel.findOne({ cardNo: item.cardNo });
        // stud => {

        if (student == null) {
          // console.log(student);
        } else {
          let obj = student;
          obj.pix = "";
          // console.log(obj);

          container = {
            ...item._doc,
            // ...student._doc,
            ...obj._doc,
          };
        }

        // }

        // console.log(container);
        return await container;
      })
    );

    // console.log(result);
    return await result;
  }
};

module.exports = {
  getTimeSlot,
  createTimeSlot,
};

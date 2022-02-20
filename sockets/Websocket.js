let onlineUsers = [];

const { getTimeSlot } = require('../services/timeSlotServices');
const { modifyWalletBalance } = require('../services/transactionServices');



const connection = function (client) {
  console.log('new user connected')
  console.log(client.id);
  console.log(client.handshake.query.token)

  //user has to identify with there Id
  client.on("userid", (userId) => {
    console.log(userId);
    onlineUsers.push({userId, socketId: client.id});
    
    getTimeSlot({userId}).then(
      result => {
        
        console.log(result);
        let currentTime = Date.now();
        client.emit("INCOMING_SLOT", result, currentTime, (response) => {
          console.log(response)
        })
      }
    )
  });


  client.on("data", (data, cb) => {
    // console.data(data);
  })
  
  client.on("VIEW", (data, cb) => {
    
    console.log(client.id)
    console.log(data, onlineUsers, parseFloat(data.viewTime) * 0.0000092593);

    modifyWalletBalance({userId: data.userId, value: data.viewTime * 0.002}, "+")
  })


  // event fired when the chat room is disconnected
  client.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== client.id);
    console.log('user disconnected')
    console.log(onlineUsers);
  });

  //private message messenger for sending private messages
//   client.on("privatemessage", (data, cb) => {
//     console.log(data);

//     //saves message to database
//     saveMessage(data).then(result => {
//       if(result.nModified){

//         cb("message saved successfully");
//       }
//     })

//     let foundUser = findValue(users, data.recieverId);
//     // console.log(foundUser)
    
//     //sends message only when user is online
//     if(foundUser){
      
//       io.to(foundUser.socketId)
//         .emit('privatemessage', data, (error) => {
//           if(error) {
            
//           }
//         })
//     }

//   })

//   // add identity of user mapped to the socket id
//   client.on("identity", ({ userId }) => {
//     users.push({
//       socketId: client.id,
//       userId: userId,
//     });
//     console.log(users)
//   });

//   // subscribe person to chat & other user as well
//   client.on("subscribe", (room, otherUserId = "") => {
//     subscribeOtherUser(room, otherUserId);
//     client.join(room);
//   });
//   // mute a chat room
//   client.on("unsubscribe", (room) => {
//     client.leave(room);
//   });
// }

// const subscribeOtherUser = function (room, otherUserId) {
//   const userSockets = this.users.filter(
//     (user) => user.userId === otherUserId
//   );
//   userSockets.map((userInfo) => {
//     const socketConn = global.io.sockets.connected(userInfo.socketId);
//     if (socketConn) {
//       socketConn.join(room);
//     }
//   });
}


const getSocketId = (userId) => {
  
  let USER = onlineUsers.find(o => o.userId === userId);
  
  // console.log(obj);
  return USER.socketId 
}



module.exports = {
  connection,
  // subscribeOtherUser
}
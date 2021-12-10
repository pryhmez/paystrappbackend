const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const transactionRoutes = require("./transactionRoutes");

// const {mySocket} = require('../sockets');


module.exports = function (router) {
    router.use("/auth", authRoutes());
    router.use("/transaction", transactionRoutes());

    return router;
}
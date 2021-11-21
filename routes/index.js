const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

const {mySocket} = require('../sockets');


module.exports = function (router) {
    router.use("/auth", authRoutes());
    router.use("/attendance", userRoutes());

    return router;
}
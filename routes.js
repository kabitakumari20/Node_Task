const userRoutes = require("./src/app/modules/User/user.routes/user.routes")

module.exports = [
    {
        path: "/api/user",
        handler: userRoutes
    }
]
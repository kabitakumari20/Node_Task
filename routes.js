const userRoutes = require("./src/app/modules/User/user.routes/user.routes")
const questionRoutes = require("./src/app/modules/question/question.router/question.router")
const categoryRoutes = require("./src/app/modules/category/category.router/category.router")
module.exports = [
    {
        path: "/api/user",
        handler: userRoutes
    },
    {
        path: "/api/question",
        handler: questionRoutes
    },
    {
        path: "/api/category",
        handler: categoryRoutes
    }
]
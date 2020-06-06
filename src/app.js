
//require express and app
const express = require('express');
const app = express();


//require middleware
const homeRouter = require("./routers/main/routes/home.js")
const {notFound,serverError} = require("./routers/main/routes/errors")
const loadLoggedInUserId = require('./routers/auth/middleware/loadLoggedInUserId')
const cookieParser = require("cookie-parser")


//require routers
const usersRouter = require('./routers/userProfile/router')
const relationshipRouter = require('./routers/relationships/router')
const messagesRouter = require('./routers/messages/router')
const settingsRouter = require('./routers/userSettings/router')
const authRouter = require('./routers/auth/router')
const csurfRouter = require('./routers/csurf/router')



//use middleware
app.use(cookieParser())
app.use(express.json())
app.use(loadLoggedInUserId)



//use routers
app.use("/auth", authRouter)
app.use(usersRouter)
app.use(csurfRouter)
app.use(relationshipRouter)
app.use(messagesRouter)
app.use(settingsRouter)



//use main routes
app.get("/", homeRouter.get)
app.use(serverError)
app.use(notFound)



module.exports = app;


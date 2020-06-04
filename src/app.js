
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")

const homeRouter = require("./routers/main/routes/home.js")
const {notFound,serverError} = require("./routers/main/routes/home.js")



const loadLoggedInUserId = require('./routers/auth/middleware/loadLoggedInUserId')


const usersRouter = require('./routers/userProfile/router')
const relationshipRouter = require('./routers/relationships/router')
const messagesRouter = require('./routers/messages/router')
const settingsRouter = require('./routers/settings/router')
const authRouter = require('./routers/auth/router')
const csurfRouter = require('./routers/csurf/router')



app.use(cookieParser())
app.use(express.json())



app.use(loadLoggedInUserId)




app.use("/auth", authRouter)
app.use(usersRouter)
app.use(csurfRouter)
app.use(relationshipRouter)
app.use(messagesRouter)
app.use(settingsRouter)



//main router
app.get("/", homeRouter.get)
app.use(notFound)
app.use(serverError)



module.exports = app;
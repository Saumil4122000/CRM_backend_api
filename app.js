require("dotenv").config()
const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const port = process.env.port || 3000

// API security
app.use(helmet())

// handle CORS Error
app.use(cors())


// MongoDb connection
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    // Documentation info
})

if (process.nextTick.NODE_ENV !== 'production') {
    const mDb = mongoose.connection;
    mDb.on('open', () => {
        console.log("Mongodb is connected")
    })
    mDb.on('error', (error) => {
        console.log(error);
    })

    // Logger
    // Showing logs when some request is made
    app.use(morgan('combined'))

}



app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())




// Load Routers
const userRouter = require("./src/routers/user.router")
app.use('/v1/user', userRouter)

const ticketRouter = require("./src/routers/ticket.router")
app.use('/v1/ticket', ticketRouter)


// Error handling to avoid crash
const handleError = require("./src/utils/errorHandler")



app.use("*", (req, res, next) => {
    const error = new Error("Resource not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    handleError(error, res)
})

app.listen(port, () => {
    console.log(`API IS ready to run on http://localhost:${port}`)
})
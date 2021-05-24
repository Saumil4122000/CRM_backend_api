const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const cors=require("cors")
const helmet=require("helmet")
const morgan=require("morgan")

// API security
app.use(helmet())

// handle CORS Error
app.use(cors())

// Logger
// Showing logs when some request is made
app.use(morgan('combined'))

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const port=process.env.port || 3000


// Load Routers
const userRouter=require("./src/routers/user.router")
app.use('/v1/user',userRouter)

const ticketRouter=require("./src/routers/ticket.router")
app.use('/v1/ticket',ticketRouter)


// Error handling to avoid crash
const handleError=require("./src/utils/errorHandler")



app.use("*",(req,res,next)=>{
    const error=new Error("Resource not found")
    error.status=404
    next(error)
})

app.use((error,req,res,next)=>{
    handleError(error,res)
})

app.listen(port,()=>{
    console.log(`API IS ready to run on http://localhost:${port}`)
})
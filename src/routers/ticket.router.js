const express = require("express")
const router = express.Router()
const { insertTicket,getTicket } = require("../model/Ticket/Ticket.model")
const { userAuthorization } = require("../middlewares/authorization.middleware")
// WorkFlow
// 1 create url endpoint
// 2 retreive nreticket data
// 3 Authorize every requesyy with jwt
// 4 insert into database
// 5 Retreive all ticket for specific user 
// 6 retreive ticket from mongodb
// 7 update message conversation in ticket db
// 8 update ticket status
// 9 close operator responsive pending,client response pending
// 10 delete ticket from mongodb



router.all("/", (req, res, next) => {
   // res.json({ message: "return from ticket router" })
   next()
})

// 1 create url endpoint -ticket is created
router.post("/", userAuthorization, async (req, res) => {
   try {
      const { subject, sender, message } = req.body

      const userId=req.userId

      const ticketObj = {
         clientId: userId,
         subject,
         conversation: [{
            sender,
            message
         }]
      }

      const result = await insertTicket(ticketObj)
      if (result._id) {
         return res.json({ status: "success", message: "new ticket created" })
      }

      res.json({ status: "error", message: "Unable to create ticket please try again" })
   } catch (error) {
       res.json({ status: "error", message: error.message })
   }
})


// Get all tickets for user
router.get("/", userAuthorization, async (req, res) => {
   try {
      
      const userId=req.userId

    

      const result = await getTicket(userId)
      
      console.log(result)
         return res.json({ status: "success", result })
  

      // res.json({ status: "error", message: "Unable to create ticket please try again" })
   } catch (error) {
       res.json({ status: "error", message: error.message })
   }
})



module.exports = router
const express = require("express")
const router = express.Router()
const { insertTicket } = require("../model/Ticket/Ticket.model")
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
router.post("/",async (req, res) => {
 



   try {
      const { subject, sender, message } = req.body

      const ticketObj = {
         clientId: "60af7f5cbac0f306703cc64e",
         subject,
         conversation: [{
            sender,
            message
         }]
      }

      const result = await insertTicket(ticketObj)
      if (result._id) {
         res.json({ status: "success", message: "new ticket created" })
      }

      res.json({ status: "error", message: "Unable to create ticket please try again" })
   } catch (error) {
         res.json({status:"error",message:error.message})
   }




})

module.exports = router
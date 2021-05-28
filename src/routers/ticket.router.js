const express = require("express")
const router = express.Router()
const { insertTicket,getTicket,getTicketByid,updateClientReply,updatestatusClose,deleteTicket } = require("../model/Ticket/Ticket.model")
const { userAuthorization } = require("../middlewares/authorization.middleware")
const {createNewTicketValidation,ReplyTicketMessageValidation}=require("../middlewares/formValidation.middlewares")
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
router.post("/", createNewTicketValidation ,userAuthorization, async (req, res) => {
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

router.get("/:_id", userAuthorization, async (req, res) => {

   console.log(req.params)
   try {
      
      const {_id}=req.params;
      const userId=req.userId
      const result = await getTicketByid(_id,userId)
      console.log(result)
         return res.json({ status: "success", result })
  

      // res.json({ status: "error", message: "Unable to create ticket please try again" })
   } catch (error) {
       res.json({ status: "error", message: error.message })
   }
})

router.put("/:_id/",ReplyTicketMessageValidation ,userAuthorization, async (req, res) => {

   console.log(req.params)
   try {
      const {message,sender}=req.body

      const {_id}=req.params;
      console.log(_id+"asasa")
      const result = await updateClientReply({_id,message,sender})
      console.log(result)
         

      if(result._id){
      return res.json({ status: "success", message:"Your message updated" })
      }

      res.json({ status: "error", message: "Unable to update message" })
   } catch (error) {
       res.json({ status: "error", message: error.message })
   }
})

// Close ticket
router.patch("/close-ticket/:_id", userAuthorization, async (req, res) => {

   try {
      const {_id}=req.params;
    
      const userId=req.userId;

      // console.log(userId+"PAPAPAPAPAPA")
      const result = await updatestatusClose(_id,userId)
      
         

      if(result._id){
      return res.json({ status: "success", message:"Ticket has been closed" })
      }

      res.json({ status: "error", message: "Unable to close Ticket" })
   } catch (error) {
       res.json({ status: "error", message: error.message })
   }
})

// Delete ticket
router.delete("/close-ticket/:_id", userAuthorization, async (req, res) => {

   try {
      const {_id}=req.params;
    
      const userId=req.userId;

      // console.log(userId+"PAPAPAPAPAPA")
      const result = await deleteTicket(_id,userId)
      
      // console.log(result)

     
      return res.json({ status: "success", message:"Ticket has been deleted" })
   

      
   } catch (error) {
       res.json({ status: "error", message: error.message })
   }
})


module.exports = router
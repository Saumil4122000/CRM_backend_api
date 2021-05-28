const { TicketSchema } = require("../../model/Ticket/Ticket.schema")

const insertTicket = (ticketObj) => {


    return new Promise((resolve, reject) => {
        try {
            TicketSchema(ticketObj).save()
            .then(data => {resolve(data)})
            .then(error => { reject(error) })
        } catch (error) {
            reject(error);
        }
    })

}

const getTicket=(clientID)=>{
    return new Promise((resolve, reject) => {
    
        try {
            TicketSchema.find({clientId: clientID})
            .then((data) => resolve(data))
            .catch((error) =>  reject(error))
        } catch (error) {
            reject(error);
        }
    }
    )
}
module.exports={
    insertTicket,
    getTicket
}
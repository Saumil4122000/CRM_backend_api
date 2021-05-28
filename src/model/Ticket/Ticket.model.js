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
module.exports={
    insertTicket
}
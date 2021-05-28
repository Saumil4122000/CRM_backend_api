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

const getTicket=(clientId)=>{
    return new Promise((resolve, reject) => {
    
        try {
            TicketSchema.find({clientId})
            .then((data) => resolve(data))
            .catch((error) =>  reject(error))
        } catch (error) {
            reject(error);
        }
    }
    )
}


const getTicketByid=(_id,clientId)=>{
    console.log("this is client id"+clientId)
    return new Promise((resolve, reject) => {
       
        try {
            TicketSchema.find({_id,clientId})
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
    getTicket,
    getTicketByid
}
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



const updateClientReply=({_id,message,sender})=>{

    return new Promise((resolve, reject) => {
       
        try {
            TicketSchema.findOneAndUpdate(
                {_id},
                {
                    status:"Pending operator response",
                    $push:{
                        conversation:{message,sender}
                    }
                },
                {new:true}
                )
            .then((data) => resolve(data))
            .catch((error) =>  reject(error))
        } catch (error) {
            reject(error);
        }
    }
    )
}
const updatestatusClose=(_id,clientId)=>{
// console.log(clientId+"PAPAPAPAPAPAPAPA")
    return new Promise((resolve, reject) => {
       
        try {
            TicketSchema.findOneAndUpdate(
                {_id,clientId},
                {
                    status:"Closed",
                    
                },
                {new:true}
                )
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
    getTicketByid,
    updateClientReply,
    updatestatusClose
}
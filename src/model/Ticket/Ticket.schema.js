const { string } = require("joi")
const mongose = require("mongoose")
const Schema = mongose.Schema
const TicketSchema = new Schema({

    clientId: {
        type: Schema.Types.ObjectId
    },
    subject: {
        type: String,
        maxlength: 100,
        required: true,
        default: ""
    },
    openAt: {
        type: Date,
        required: true,
        default: Date.now()
    },

    status: {
        type: String,
        maxlength: 30,
        required: true,
        default:"Pending Operator response"
    },
    conversation:[{
        sender:{
            type:String,
            maxlength:50,
            required:true,
            default:""
        },
        message: {
            type: String,
            maxlength: 3000,
            required: true,
            default:""
        },
        msgAt:{
            type: Date,
            required: true,
            default: Date.now()
        }
    }]

})

module.exports = {
    TicketSchema: mongose.model('Ticket', TicketSchema)
    // Passing the table name =>{User}
}
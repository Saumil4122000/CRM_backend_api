const mongose = require("mongoose")
const Schema = mongose.Schema
const ResetPinSchema = new Schema({
    pin: {
        type: String,
        minlength: 6,
        maxlength: 6
    },
    email: {
        type: String,
        maxlength: 50,
        required: true
    },
    addedAt:{
        type:Date,
        required:true,
        default:Date.now()
    }

})

module.exports = {
    ResetPinSchema: mongose.model('Reset_pin', ResetPinSchema)
    // Passing the table name =>{User}
}
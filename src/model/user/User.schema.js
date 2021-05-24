const mongose = require("mongoose")
const Schema = mongose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    company: {
        type: String,
        maxlength: 50,
        required: true
    },
    address: {
        type: String,
        maxlength: 100,

    },
    phone: {
        type: Number,
        minlength: 10,

    },
    email: {
        type: String,
        maxlength: 50,
        required: true
    },
    password: {
        type: String,
        maxlength: 100,
        minlength: 8,
        required: true
    }
})

module.exports = {
    UserSchema: mongose.model('User', UserSchema)
    // Passing the table name =>{User}
}
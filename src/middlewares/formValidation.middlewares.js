const Joi = require("joi")
const joi = require("joi")
const email = joi.string()
    .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
    })
const pin = joi.string().min(6).max(6).required()
const newPassword = joi.string().alphanum().min(6).max(30).required()




// To understand what it does try to remove data between  {} and send the request or we send not matching format of email then throw error like "saumil715@gmail" throw error
// in POST http://localhost:3000/v1/user/reset-password

const resetPassReqValidation = (req, res, next) => {
    const schema = joi.object({ email })
    const value = schema.validate(req.body)
    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
    }
    next();
}


const updatePassValidation = (req, res, next) => {
    const schema = joi.object({ pin, newPassword })
    const value = schema.validate(req.body)
    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
    }
    next();
}
const shortStr = Joi.string().min(3).max(30);
const longStr = Joi.string().min(3).max(100);


const createNewTicketValidation = (req, res, next) => {
    const schema = Joi.object({
        subject: shortStr.required(),
        sender: shortStr.required(),
        message: longStr.required()
    })

    const value = schema.validate(req.body)
    console.log(value)
    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
    }
    next();
}


const ReplyTicketMessageValidation = (req, res, next) => {
    const schema = Joi.object({
        sender: shortStr.required(),
        message: longStr.required()
    })

    const value = schema.validate(req.body)
    if (value.error) {
        console.log(value.error)
        return res.json({ status: "error", message: value.error.message })
    }
    next();
}


module.exports = {
    resetPassReqValidation,
    updatePassValidation,
    createNewTicketValidation,
    ReplyTicketMessageValidation
}
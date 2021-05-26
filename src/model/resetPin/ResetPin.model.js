const { ResetPinSchema } = require('../resetPin/ResetPin.schema')
const { randomPinNumber } = require("../../utils/randomGenerator")
const setPasswordResetPin = async (email) => {

    const randPin = await randomPinNumber(6);

    const restObj = {
        email,
        pin: randPin
    }
    return new Promise((resolve, reject) => {
        ResetPinSchema(restObj).save()
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

module.exports = {
    setPasswordResetPin
}

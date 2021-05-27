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


const getPinByEmailPin=(email,pin)=>{

    return new Promise((resolve,reject)=>{
        try {
            ResetPinSchema.findOne({email,pin},(error,data)=>{
                if(error){
                    console.log(error);
                    resolve(false)
                }
                 resolve(data);
            })
        } catch (error) {
            reject(error);
            console.log(error)
        }
    })

   
}
const deletePin=(email,pin)=>{


        try {
            ResetPinSchema.findOneAndDelete({email,pin},(error,data)=>{
                if(error){
                    console.log(error);
                   
                }
               
            })
        } catch (error) {
            
            console.log(error)
        }

   
}
module.exports = {
    setPasswordResetPin,
    getPinByEmailPin,
    deletePin
}

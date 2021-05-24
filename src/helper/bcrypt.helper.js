const bcrypt = require("bcrypt")
const saltRound = 10

// It is used for intelligent password to non sence password form
// And this saltRound shows the time 10s for pass(intelligent)=>pass(non-sence form)

const hashPassword = plainPassword => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(plainPassword, saltRound))
    })
}

const comparePassword=(plainPass,passFromDb)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(plainPass,passFromDb,(err,result)=>{
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = {
    hashPassword,
    comparePassword
}
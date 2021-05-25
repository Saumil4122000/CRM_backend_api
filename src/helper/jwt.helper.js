const jwt = require("jsonwebtoken")
const { getJWT, setJWT } = require("./redis.helper")
const {storeUserRefreshJWT} =require('../model/user/User.model')
const createAccessJWT = async(email,_id) => {

    try {
        const accessJWT =await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' })
        // Shhhhh is secret key 

        await setJWT(accessJWT,_id)

        return Promise.resolve(accessJWT)
    } catch (error) {
        return Promise.reject(error)
    }
}
const createRefreshJWT = async(email,_id) => {

    try {
        const refreshJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' })
        // Shhhhh is secret key 
    
       await storeUserRefreshJWT(_id,refreshJWT)
       return Promise.resolve(refreshJWT)
    } catch (error) {
        return Promise.reject(error)
    }


 
    // return Promise.resolve(refreshJWT)
}


module.exports = {
    createAccessJWT,
    createRefreshJWT
}
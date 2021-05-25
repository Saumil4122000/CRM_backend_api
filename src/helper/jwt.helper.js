const jwt = require("jsonwebtoken")
const { getJWT, setJWT } = require("./redis.helper")
const { storeUserRefreshJWT } = require('../model/user/User.model')
const { userAuthorization } = require("../middlewares/authorization.middleware")
const createAccessJWT = async (email, _id) => {

    try {
        const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' })
        // Shhhhh is secret key 

        await setJWT(accessJWT, _id)
        // Storing the accessTokwn to radis database
        return Promise.resolve(accessJWT)
    } catch (error) {
        return Promise.reject(error)
    }
}
const createRefreshJWT = async (email, _id) => {

    try {
        const refreshJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' })
        // Shhhhh is secret key 

        // Storing the refreshTokwn to mongodb
        await storeUserRefreshJWT(_id, refreshJWT)
        return Promise.resolve(refreshJWT)
    } catch (error) {
        return Promise.reject(error)
    }

}

const verifyAccess = (userJWT) => {
    try {
        return  Promise.resolve(  // Decode the jwt webtoken which is created by jwt through the sercet keu
            jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET)
        )
    } catch (error) {
        // User is not verify
        return Promise.resolve(error);
    }
}


module.exports = {
    createAccessJWT,
    createRefreshJWT,
    verifyAccess
}
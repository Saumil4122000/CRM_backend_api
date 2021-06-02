const express = require("express")
const router = express.Router()
const { deleteJWT } = require("../helper/redis.helper")
const { insertUser, getUserByEmail, getUserById, updatePassword, storeUserRefreshJWT } = require('../model/user/User.model')
const { userAuthorization } = require('../middlewares/authorization.middleware')
const { hashPassword, comparePassword } = require("../helper/bcrypt.helper")
const { json } = require("body-parser")
const { createRefreshJWT, createAccessJWT } = require("../helper/jwt.helper")
const { setPasswordResetPin, getPinByEmailPin, deletePin } = require("../model/resetPin/ResetPin.model")
const { mailProcessor } = require("../helper/email.helper")
const { resetPassReqValidation, updatePassValidation } = require("../middlewares/formValidation.middlewares")

router.all("/", (req, res, next) => {
    // res.json({message : "return from user router"})
    next()
})


// Get User Profile Router
router.get('/', userAuthorization, async (req, res) => {

    // Client send the request so it will go to userAuthorization(Middlewares) which will grab the jwt token from headers 

    //  From userAuthorization calls the next() so  control comes to async(req,res)=> part and function will be executed once the authorization done

    // 3) extract userid from radis
    // This _id comes from the userAuthorization(Middlewares) where id is set
    const _id = req.userId


    // Calling the function to get data from mongodb through _id got from redis db
    const userProf = await getUserById(_id)

    const {name,email}=userProf;
    // 4) get User profile from Mongodb through id 
    res.json({ user: {
        _id,
        name,
        email
    } 
})
})


// create user route
router.post("/", async (req, res) => {
    const { name, company, phone, address, email, password } = req.body;

    try {
        const hashedPass = await hashPassword(password)
        // Creating Object for attributes but used encrypted password
        const newUserObj = {
            name,
            company,
            phone,
            address,
            email,
            password: hashedPass

        }
        const result = await insertUser(newUserObj)
        console.log(result);
        res.json({ message: "New User Created", result })
    }
    catch (error) {
        console.log(error);
        res.json({ status: "error", message: error.message })
    }

})

// create sign in router
router.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;
    // Get user  with email from db
    // hash our password (encrypt) and compare with the db stored encrypted password
    // Because we can't decrypt the encrypted password so we encrypt user entered password
    if (!email || !password) {
        res.json({ status: "Error", message: "Enter Complete Details" })
    }

    const user = await getUserByEmail(email)
    console.log(user)

    // user._id there then we fetch password otherwise null stored in passfromdb

    const passFromdb = user && user._id ? user.password : null

    if (!passFromdb) { res.json({ status: "Error", message: "Invalid email or password" }) }



    const result = await comparePassword(password, passFromdb)
    // console.log(result)


    if (!result) {
        return res.json({ status: "Error", message: "Invalid email or password" })
    }
    // If result of login is true then generate token
    const accessJWT = await createAccessJWT(user.email, `${user._id}`)
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`)
    res.json({
        status: "Success",
        message: "Login successful",
        accessJWT,
        refreshJWT
    })

})


router.post("/reset-password", resetPassReqValidation, async (req, res) => {
    const { email } = req.body
    const user = await getUserByEmail(email);
    if (user && user._id) {
        // create 2)create unique 6 digit pin
        // 3) Save pin to Mongodb
        const setPin = await setPasswordResetPin(email);
        await mailProcessor({ email, pin: setPin.pin, type: "request-new-pass" })


        return res.json({
            status: "Success",
            message: "If email is there in db then pin will be send in short time"
        });


    }
    res.json({ status: "error", message: "If email is there in db then pin will be send in short time" })
})


// 3) After sending pin through mail lets update the password and store to db
router.patch("/reset-password", updatePassValidation, async (req, res) => {
    const { email, pin, newPassword } = req.body;
    // Validate if pin is exist in db or not
    const getPin = await getPinByEmailPin(email, pin);

    if (getPin._id) {
        const dbDate = getPin.addedAt;
        // Check if pin expired or not
        const expireIn = 1;
        let expDate = dbDate.setDate(dbDate.getDate() + expireIn)
        const today = Date();
        if (expDate < today) {
            return res.json({ status: "error", message: "Invalid or expired date" })
        }

        const hashpass = await hashPassword(newPassword);

        const result = await updatePassword(email, hashpass);


        if (result._id) {

            // Send email notification

            await mailProcessor({ email, type: "password-update-success" })
            deletePin(email, pin)
            return res.json({ status: "success", message: "Updated successfully" })
        }
        // If date is valid then encrypt the newly added password and store it to db

    }

    res.json({ status: "error", Message: "unable to update password" })

})



// 1)get jwt and verify
// 2)delete accessjwt from redis db
// 3)delete refreshtoken from mongodb

router.delete("/logout", userAuthorization //get jwt and verify
    , async (req, res) => {
        const { authorization } = req.headers
        const _id = req.userId;
        // 2)delete accessjwt from redis 
        deleteJWT(authorization)
        // 3)delete refreshtoken from mongodb
        const result = await storeUserRefreshJWT(_id, "")
        if (result._id) {
            return   res.json({status:"success",message:"Log Out successfully"})
        }
        // Passing the empty refresh token so it store empty in refresh token
         res.json({ result })
    })



module.exports = router
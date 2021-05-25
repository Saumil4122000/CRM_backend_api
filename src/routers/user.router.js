const express = require("express")
const router = express.Router()
const { insertUser, getUserByEmail,getUserById } = require('../model/user/User.model')
const {userAuthorization}=require('../middlewares/authorization.middleware')
const { hashPassword, comparePassword } = require("../helper/bcrypt.helper")
const { json } = require("body-parser")
const { createRefreshJWT, createAccessJWT } = require("../helper/jwt.helper")

router.all("/", (req, res, next) => {
    // res.json({message : "return from user router"})
    next()
})


// Get User Profile Router
router.get('/',userAuthorization,async(req,res)=>{
   
    // Client send the request so it will go to userAuthorization(Middlewares) which will grab the jwt token from headers 

    //  From userAuthorization calls the next() so  control comes to async(req,res)=> part and function will be executed once the authorization done
 
    // 3) extract userid from radis
    // This _id comes from the userAuthorization(Middlewares) where id is set
    const _id=req.userId


    // Calling the function to get data from mongodb through _id got from redis db
    const userProf=await getUserById(_id)

    // 4) get User profile from Mongodb through id 
    res.json({user:userProf})
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
        res.json({ status: "Error", message: "Invalid email or password" })
    }
    // If result of login is true then generate token
    const accessJWT = await createAccessJWT(user.email,`${user._id}`)
    const refreshJWT = await createRefreshJWT(user.email,`${user._id}`)
    res.json({
        status: "Success",
        message: "Login successful",
        accessJWT,
        refreshJWT
    })

})


module.exports = router
const express = require("express")
const router = express.Router()
const { insertUser } = require('../model/user/User.model')
const {hashPassword} =require("../helper/bcrypt.helper")

router.all("/", (req, res, next) => {
    // res.json({message : "return from user router"})
    next()
})

router.post("/", async (req, res) => {
    const {name,company,phone,address,email,password}=req.body;

    try {
        const hashedPass=await hashPassword(password)
        // Creating Object for attributes but used encrypted password
        const newUserObj={
            name,
            company,
            phone,
            address,
            email,
            password:hashedPass

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

module.exports = router
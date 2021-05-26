const express=require("express");
const { verifyRefresh } = require("../helper/jwt.helper");
const router=express.Router();
const {getUserByEmail}=require("../model/user/User.model");
const {createAccessJWT}=require("../helper/jwt.helper")



router.get("/",async(req,res,next)=>{
    const {authorization}=req.headers;
    console.log(authorization)
    
    // 1) Make sure tokens is valid
    const decoded=await verifyRefresh(authorization)

    if(decoded.email){
    // 2) Token is exist in database
    const userProfile=await getUserByEmail(decoded.email);
        if(userProfile._id){
            let tokenExp=userProfile.refreshJWT.addedAt;

            const dbrefreshToken=userProfile.refreshJWT.token;


            tokenExp=tokenExp.setDate(tokenExp.getDate()+ (+process.env.JWT_REFRESH_SECRET_EXP_DAY))
            

            //  (+process.env.JWT_REFRESH_SECRET_EXP_DAY) Means converting the number of days which is 30 to  number and add it to refreshtoken stored so token has validity upto 30 days
            // Then it will check if the today date is greater than the expire date then it shows forbidden
        
            // console.log(new Date(tokenExp))

            const today=Date();
            if(tokenExp<today){
               return res.status(403).json({message:"Forbidden"})
              
            }

            if(dbrefreshToken!==authorization && tokenExp<today){
                return res.status(403).json({message:"Forbidden"})
            }

            const accessJWT=await createAccessJWT(decoded.email,userProfile._id.toString());

            // When new toke is added to redis then delete old token



            return res.json({ status:"Success",accessJWT})
            // console.log(tokenCreated)
        }
    }


    res.status(403).json({message:"Forbidden"})
    

  
    // 3) checl if Token is  expired
})

module.exports=router
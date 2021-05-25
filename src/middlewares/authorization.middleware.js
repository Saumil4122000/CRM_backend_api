const {verifyAccess}=require("../helper/jwt.helper")
const {getJWT} =require("../helper/redis.helper")
const userAuthorization=async(req,res,next)=>{
    const {authorization}=req.headers
    // req.headers will be get according to user given details fetch the header from req

    // console.log(authorization);
     // 1) Verify if jwt is valid

    const decoded=await verifyAccess(authorization)
    // console.log(decoded)
     // 2) Check if jwt exist in radisdb
    if(decoded.email){
        const userId=await getJWT(authorization)
        console.log(userId)
        if(!userId){
           return  res.status(403).json({message:'Forbidden'})
        }

        req.userId=userId
        return next()
        // After middleware continue the function execution through next() in the user.router.js
    }  
    // In the user.router.js file
    // 3) extract userid from radis
    // 4) get User profile from Mongodb through id 

   
  
    return  res.status(403).json({message:'Forbidden'})
 
   
}

module.exports={
    userAuthorization
}
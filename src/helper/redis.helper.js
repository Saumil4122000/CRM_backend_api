const redis = require("redis")
const client = redis.createClient(process.env.REDIS_URL)
// redis://localhost:6379

client.on("error",function(error){
    console.log(error);
});

const setJWT = (key, value) => {
    // console.log(key,value)
    // Storing AccessToken to radis database
    return new Promise((resolve, reject) => {

        try {
            client.set(key, value, (err, resp) => {
                if (err) reject(err)
                resolve(resp);
            })
        } catch (error) {
            reject(error)
        }

    })

}

const deleteJWT=(key)=>{
    try {
        client.del(key)
    } catch (error) {
        console.log(error);
    }
}

const getJWT = (key) => {
    // console.log(key)
    return new Promise((resolve, reject) => {

        try {
            client.get(key, (err, resp) => {
                if (err) reject(err)
                resolve(resp);
            })
        } catch (error) {
            reject(error)
        }

    })

}

module.exports={
    setJWT,
    getJWT,
    deleteJWT
}

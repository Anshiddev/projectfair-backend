const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwtmiddleware");
    try{
        const token = req.headers.authorization.split(" ")[1]
        if (token) {
            const result = jwt.verify(token,process.env.secretkey)
            console.log(result);
            req.payload = result.userId
            next()
        }
        else{
            res.status(406).json("Please Login!!!")
        }
    }
    catch(err){
        console.log(err);
        res.status(406).json("Please Login First !!!")
    }
}

module.exports=jwtMiddleware
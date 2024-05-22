const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

exports.userRegister= async(req,res)=>{
    // console.log('hit');
    const {username,email,password} = req.body
    console.log(username,email,password);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Exist ...")
        }
        else {
            const newUser = new users ({
                username ,password,email,profile: "",github : "",linkdin :""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        console.log(err);
        res.status(404).json(err)
    }
}

exports.userLogin = async (req,res) => {
    const { email,password } = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if (existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.secretkey)
            res.status(200).json({token,user:existingUser.username,userDetails:existingUser})
        }else {
            res.status(406).json("Invalid Username/password")
        }
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.profileUpdate= async(req,res)=>{
    const userId = req.payload
    const {username,email,password,github,linkdin} = req.body
    const profile =req.file?req.file.filename:req.body.profile

    try{
        const userProfile = await users.findByIdAndUpdate({_id: userId},{username,email,password,github,linkdin,profile},{new: true})
        await userProfile.save()
        res.status(200).json(userProfile)
    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
    }
}
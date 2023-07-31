const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register =  (req, res, next) => {
    console.log("heyy it works")
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
         user.save().then(user => {
                res.send("successsss");
            }).catch(error => {
                console.log("fail");
                res.json({
                    message: 'an error occured'
                })
            })
    })

}
const login=(req,res,next) =>{
    var username=req.body.username
    var password=req.body.password
    User.findOne({email:username})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token=jwt.sign({name:user.name},'AzQ,PI)0(',{expiresIn:'1h'})
                    res.json({
                        message:'login succesful',
                        token
                    })
                }else{
                    res.json({
                        message:"password does not match"
                    })
                }
            })
            
        }
    })
}
module.exports = {
    register,login
}
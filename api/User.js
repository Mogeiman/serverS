const express = require('express')
const router = express.Router()

const User = require('./../models/User')
const bcrypt = require('bcrypt')
router.post('/signup', (req, res)=>{
    let {name, email, password, liscence, latitude, longitude} = req.body;
    name= name.trim()
    email = email.trim()
    password = password.trim()
    liscence = liscence.trim()
    latitude = latitude
    longitude = longitude
    

    if(name == "" || email == "" || password == "" || liscence == ""){
        res.json({
            status: "FAILED",
            message: "empty input fields"
        })
    }else if (!/^[a-zA-Z]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        }) 
    // }else if (!/^[\w-\.]+@([\w-]+\.){2,4}$/.test(email)){
    //     res.json({
    //         status: "FAILED",
    //         message: "Invalid email entered"
    //     }) 
    }else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short"
        }) 
    }else{
        User.find({email}).then(result => {
            if(result.length){
                res.json({
                    status: "FAILED",
                    message: "User already exists"
                }) 
            }else{
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        liscence,
                        latitude,
                        longitude
                    });
                    newUser.save().then(result=>{
                        res.json({
                            status: "SUCCESS",
                            message: "SIGNUP SUCCESSFUL",
                            data: result
                        }) 
                    })
                }).catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "error occured"
                    }) 
                })
            }
        }).catch(err => {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "an Error occured while checking for existing email"
            }) 
        })
    }
})

router.post('/signin', (req, res)=>{
    let { email, password} = req.body;
    email = email.trim()
    password = password.trim()
    if(email == "" || password == ""){
        res.json({
            status: "FAILED",
            message: "empty input fields"
        })
    } else{
        User.find({email}).then(data=>{
            if(data.length){
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result){
                        res.json({
                            status: 'Success',
                            message: "Sign in successful",
                            data: data
                        })
                    }else{
                        res.json({
                            status: "FAILED",
                            message: "Password is wrong"
                        })
                    }
                }).catch(err=>{
                    res.json({
                        status: "FAILED",
                        message: "an error occured while comparing passwords"
                    })
                })
            }else{
                res.json({
                    status: "FAILED",
                    message: "invalid credentials"
                })
            }
        }).catch(err=>{
            res.json({
                status: "Failed",
                message: "an error occured while checking for existing email"
            })
        })
    }
    
})

module.exports = router
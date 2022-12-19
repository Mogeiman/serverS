const express = require('express')
const User = require('./../models/User')

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env')

//Adding admin
exports.addadmin = async (req, res) => {
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
};

// Athenticating token
exports.authentication = (req,res) => {
  res.send({messege:"authentication successful", user:req.user})
}

//Verifying log in information recieved from the front-end


exports.login = async(req, res) => {
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
            if(data){
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

}
//Start a session if req.session.user has been set
// exports.loginSession = (req,res) => {
//   if(req.session.user){
//     res.send({loggedIn: true, user: req.session.user})
//   }else{
//     res.send({loggedIn: false})
    
//   }
// }

exports.alladmin = (req, res) =>{
  admin.findAll({
    attributes: ['id', 'username','password'],
    include:[Files]
  }).then(user => {
	  res.json(user);
	});
}


//Loging out by destroying the session
exports.logOut = (req, res) => {
  req.session.destroy(function(err){
    if(err){
       console.log(err);
    }else{
        return res.status(200).json({loggedIn: false,auth:false,messege:"You have been logged Out"});
    }
 });

  
}
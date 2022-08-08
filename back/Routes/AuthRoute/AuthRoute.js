const express = require('express')
const UserModel = require('../../Models/UserModel')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    const User = new UserModel({
        name, 
        email,
        passwordHash
    })
    User.save()
    .then(user=>{
        const myres = {
            status:'ok',
            data : user
        }
        res.send(JSON.stringify(myres))
    })
    .catch(err=>{
        res.send(JSON.stringify({status:'error'}))
    })
})

router.post('/signin', (req, res)=>{
    const {email, password} = req.body
    UserModel.findOne({email})
    .then(user=>{
        const isAuthenticated = bcrypt.compareSync(password, user.passwordHash)
        if(isAuthenticated){
            const KEY = process.env.JWT_PRIVATE
            const token = jwt.sign({name:user.name, email:user.email}, KEY)
            res.send(JSON.stringify({
                status:'ok',
                data: token
            }))
        }else{
            res.send(JSON.stringify({
                status:'Auth Failed'
            }))
        }
    })
    .catch(err=>{
        res.send(JSON.stringify({status:'error'}))
    })
})

module.exports = router
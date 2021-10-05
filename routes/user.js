const express = require('express')
const utils = require('../utils')
const db = require('../db')
const config = require('../config')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')



const router = express.Router()


//---------------------------------------------------------
//GET
//---------------------------------------------------------
router.get('/profile', (request , response) => {
    
    const statement = `select firstName, lastName, email, phone, address, city, zip, country from user where id = ${request.userId} ;`
    db.query(statement, (error, users) => 
    {
        if(error){
            
            response.send({status : 'error', error : error})
        }
        else if(users.length == 0){
            
            response.send({status : 'error', error : 'User does not exist'})

        }
        else{
            user = users[0]
            response.send(utils.createResult(error, user))
            }
    })
    
} )
//---------------------------------------------------------
//POST
//---------------------------------------------------------
router.post('/signup', (request , response) => {
    const {firstName, lastName, email, password} = request.body
    const encryptedPassword = crypto.SHA256(password)
    const statement = `insert into user(firstName, lastName, email, password) values ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}');`
    db.query(statement , (error, data) => {
        response.send(utils.createResult(error,data))
    })
    
})

router.post('/signin', (request , response) => {
    
    const {email, password} = request.body
    const statement = `select id, firstName, lastName from user where email = '${email}' and password = '${crypto.SHA256(password)}';`
    db.query(statement, (error, users) => {
        if(error){
            
            response.send({status : 'error', error : error})
        }
        else if(users.length == 0){
            
            response.send({status : 'error', error : 'User does not exist'})

        }
        else{
            user = users[0]
            const  token =jwt.sign({id : user['id']},config.secret)
            response.send(utils.createResult(error, {
            firstName :user['firstName'] ,
            lastName : user['lastName'],
            token : token
            }))
        }
    })
    
})


//---------------------------------------------------------
//PUT
//---------------------------------------------------------
router.put('/', (request , response) => {
    response.send()
})

//---------------------------------------------------------
//DELETE
//---------------------------------------------------------
router.delete('/', (request , response) => {
    response.send()
})

module.exports = router
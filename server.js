const express = require('express')
const bodyParser = require('body-parser')
const morgan =require('morgan')



//routers
const userRouter = require('./routes/user')
const brandRouter = require('./routes/brand')
const categoryRouter = require('./routes/category')
const orderRouter = require('./routes/order')
const productRouter = require('./routes/product')
const reviewRouter = require('./routes/review')
const db = require('./db')
const config = require('./config')


const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

//Add a middleware for the getting the id from token
app.use((request, response, next) =>{
    try{
        const token = request.headers['token']
        const data = jwt.verify(token, config.secret)

        //add a new key name userId with logged user's id
        request.userId = data['id']

        //go to actual route
        next()
    } catch(ex) 
    {
        response.status(401)
        response.send({status : 'error', error : 'protected api'})
    }
})


//Add the Routes

 app.use('/user' , userRouter)
app.use('/brand' , brandRouter)
app.use('/category' ,categoryRouter )
 app.use('/order' ,orderRouter )
app.use('/product' ,productRouter )
app.use('/review' , reviewRouter)



//Default Route
app.get('/' , (request , response) => {
    response.send('Welcome to myStore Application')
})

app.listen(3000,'0.0.0.0', () => {
    console.log('Listening on port 3000')
})
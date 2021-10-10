require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const expressValidator = require('express-validator')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const braintreeRouter = require('./routes/braintree')
const orderRouter = require('./routes/order')



const cookieParser = require('cookie-parser')


// db
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@task-project.igpcm.mongodb.net/Task-project?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        console.log('connect successfully')
    } catch (error) {
        console.log('connect failure')
    }
} 
connectDB()


const app = express()

app.use(express.urlencoded({extended: true,}))
app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())


// routes
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/cat',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/braintree',braintreeRouter)
app.use('/api/order',orderRouter)






const POST = process.env.PORT || 5000
app.listen(POST, () => console.log(`Server start on port ${POST}`))
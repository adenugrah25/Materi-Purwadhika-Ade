// import module
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

// create app
const app = express()
dotenv.config() //pakainya setelah express

// apply middleware
app.use(cors())
app.use(bodyParser.json())

// import database
const database = require('./database')

// connect mysql
database.connect((err) => {
    if (err) return console.error('error connecting : ' + err.stack)
    console.log('connected as id : ' + database.threadId)
})

// create home route
app.get('/', (req, res) => {
    res.status(200).send('<h1>Wellcome to my APIs</h1>')
})

// create users route
const { userRouter, categoryRouter, productRouter, productCategoryRouter } = require('./routers')
app.use('/api', userRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', productCategoryRouter)

// bind or host in localhost
const PORT = 2000
app.listen(PORT, () => console.log(`Server is running at PORT : ${PORT}`))
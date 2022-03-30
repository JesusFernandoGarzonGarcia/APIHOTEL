const express =require('express')
const mysql= require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes')
const { json } = require('express/lib/response')
//const res = require('express/lib/response')

const app =express()
app.set('port',process.env.PORT ||9000)


const dboptions ={
host: 'bhxcvvnq9j6lo7aynk87-mysql.services.clever-cloud.com',
port: '3306',
user:'u5kqcja6qbfwixja',
password:'vzKTAoGQctvrmZ3BuEoG',
database:'bhxcvvnq9j6lo7aynk87'
}

// middelware-------------------------
app.use(myconn(mysql,dboptions,'single'))
app.use(express.json())

//Routes------------------------------
app.get('/',(req,res)=>{
    res.send('Welcom to my API')
})

app.use('/hotel',routes)

// server runing ---------------------
app.listen(app.get('port'),()=>{
    console.log('server runing on server ',app.get('port'))
})
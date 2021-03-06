const express =require('express')
const mysql= require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')
const jwt = require('jsonwebtoken')
const path = require('path')
const { json } = require('express/lib/response')
const { JsonWebTokenError } = require('jsonwebtoken')
const { post } = require('./routes')
const app =express()

var cookieParser = require('cookie-parser');

require('dotenv').config()

app.use(cookieParser());
app.set('port',process.env.PORT || 9000)


function generateAccessToken(user){
return jwt.sign(user,process.env.SECRET,{expiresIn:'5m'})
}


function validateToken(req, res,next){
if(!req.cookies.tokenAccess) res.send('Access denied')

jwt.verify(req.cookies.tokenAccess,process.env.SECRET,(err,user)=>{
    if(err){
        res.send('access denied, token expired or incorrect')
    }else{
        next()
    }
})
}

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
app.use(express.urlencoded({extended:true}))

//Routes------------------------------
app.get('/',(req,res)=>{
    app.use(express.static(__dirname + '/pages'));
    res.sendFile(path.join(__dirname, '/pages/login.html'))
   //res.send('<H1>Bienvenido a INALTEZA API <br> <br>recuerda que debes iniciar sesion para poder utilizar esta API <br><br> puedes iniciar sesion ingresando a /login')

})

app.get('/auth',(req,res)=>{
    const{username,password} = req.body
    const user ={username:username}
    const accessToken = generateAccessToken(user)
    res.cookie("tokenAccess" , accessToken, {expire :'5m'})
   res.redirect('https://apihotel02.herokuapp.com/hotel/') 
})



app.use('/hotel',validateToken,routes)



// server runing ---------------------
app.listen(app.get('port'),()=>{
    console.log('server runing on server ',app.get('port'))
})
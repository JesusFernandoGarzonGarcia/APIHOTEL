const express =require('express')
const mysql= require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser');

const { json } = require('express/lib/response')
const { JsonWebTokenError } = require('jsonwebtoken')
const { post } = require('./routes')
//const res = require('express/lib/response')

require('dotenv').config()

function generateAccessToken(user){
return jwt.sign(user,process.env.SECRET,{expiresIn:'5m'})
}

const app =express()
app.use(cookieParser());
app.set('port',process.env.PORT ||9000)

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
app.use(express.urlencoded({extended:false}))

//Routes------------------------------
app.get('/',(req,res)=>{
    res.send('Welcom to my API')
})

app.get('/login',(req,res)=>{
    res.send('<html><head><title>Login</title></head><body><form metthod="GET" action="/auth"> Nombre de usuario :<input type="text" name ="text"><br>Contraseña :<input type="password" name ="password"><br><input type="submit" value ="Iniciar Sesión"></form></body></html>')
})

app.get('/auth',(req,res)=>{
    const{username,password} = req.body
    const user ={username:username}
    const accessToken = generateAccessToken(user)
    res.cookie("tokenAccess" , accessToken, {expire :'5m'})
    res.send('Autenticacion exitosa')

})

app.use('/hotel',validateToken,routes)



// server runing ---------------------
app.listen(app.get('port'),()=>{
    console.log('server runing on server ',app.get('port'))
})
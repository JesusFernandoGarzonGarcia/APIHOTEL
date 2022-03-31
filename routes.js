const express = require('express')
const tokengenerator = require('./funtions')
const routes = express.Router()

const jwt = require('jsonwebtoken')

require('dotenv').config()

function generateAccessToken(user){
return jwt.sign(user,process.env.SECRET,{expiresIn:'5m'})
}


routes.get('/login',(req,res)=>{
    res.send('<html><head><title>Login</title></head><body><form metthod="GET" action="/auth"> Nombre de usuario :<input type="text" name ="text"><br>Contraseña :<input type="password" name ="password"><br><input type="submit" value ="Iniciar Sesión"></form></body></html>')
})

routes.get('/auth',(req,res)=>{
    console.log("ingresa a autorizar")
    const{username,password} = req.body
    const user ={username:username}
    const accessToken = generateAccessToken(user)
    res.header('authorization',accessToken).json({
        message:'Usuario autorizado',
        token: accessToken
    })
})



routes.get('/users',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM userregistration',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/admin',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM admin',(err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})


routes.get('/rooms',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM rooms',(err,rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/teams',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM courses',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/prueba',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM courses',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/reserve',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM registration',(err,rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})




routes.post('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO userregistration SET ?',[req.body],(err,rows)=>{
           if(err) return res.send(err)

         res.json('usuario registrado')
        })
    })
})

routes.post('/addAdmin',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO admin SET ?',[req.body],(err,rows)=>{
           if(err) return res.send(err)

         res.json('admin registrado')
        })
    })
})

routes.delete('/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('DELETE FROM userregistration WHERE id=?',[req.params.id],(err,rows)=>{
           if(err) return res.send(err)

         res.json('usuario Eliminado')
        })
    })
})

routes.put('/:id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)

        conn.query('UPDATE userregistration set ? WHERE id=?',[req.body,req.params.id],(err,rows)=>{
           if(err) return res.send(err)

         res.json('Usuario Actualizado')
        })
    })
})



module.exports = routes
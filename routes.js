const express = require('express')
const ax = require('axios')
const tokengenerator = require('./funtions')
const routes = express.Router()
const path = require('path')
var SecureConf = require('secure-conf');
var sconf      = new SecureConf();


const jwt = require('jsonwebtoken')
const { send, json } = require('express/lib/response')

require('dotenv').config()

function generateAccessToken(user){
return jwt.sign(user,process.env.SECRET,{expiresIn:'5m'})
}

routes.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/pages/index.html'));
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

routes.get('/reserves',(req,res)=>{
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

routes.get('/accessRoket',(req,res)=>{
    res.preventDefault()
    ax({
        method: 'POST',
        url: 'https://rocketsapi.herokuapp.com/api/auth/signin',
        responseType: 'application/json',
        contentType: 'application/json',
        data: {
            "email":"inalteza@gmail.com",
            "password":"1234567890"
        }
      }).then(function (response) {  console.log(response)
      });
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
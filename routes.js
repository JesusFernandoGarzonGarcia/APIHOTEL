const express = require('express')
const tokengenerator = require('./funtions')
const routes = express.Router()

const jwt = require('jsonwebtoken')

require('dotenv').config()

function generateAccessToken(user){
return jwt.sign(user,process.env.SECRET,{expiresIn:'5m'})
}

routes.get('/',(req,res)=>{
  
    res.json({
        saludo:"Bienvenido a esta api",
        acciones_que_puedes_realizar:[{
            accion_1: "utiliza /users para obtener la lista de todos los usuarios",
            accion_2: "utiliza /rooms para obtener la lista de todas las habitaciones ",
            accion_3: "utiliza /teams para obtener la lista de todos los equipos",
            accion_4: "utiliza /reserve para obtener la lista de todas las reservaciones"
        }],
        consideraciones:""
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
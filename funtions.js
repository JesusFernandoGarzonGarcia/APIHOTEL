const jwt = require('jsonwebtoken')

require('dotenv').config()

function generateAccessToken(user){
return jwt.sign(user,process.env.SECRET,{expirenIn:'5m'})
}


function validateToken(req, res,next){
    const accessToken = req.header['authorization'] || req.query.accessToken
    if(!accessToken) res.send('Access denied')
    
    jwt.verify(accessToken,process.env.SECRET,(err,user)=>{
        if(err){
            res.send('access denied, token expired or incorrect')
        }else{
            next()
        }
    })
    }
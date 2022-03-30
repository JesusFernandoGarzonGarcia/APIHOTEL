const jwt = require('jsonwebtoken')

require('dotenv').config()

function generateAccessToken(user){
return jwt.sign(user,process.env.SECRET,{expirenIn:'5m'})
}
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.auth= () => {
    return (req,res,next) =>{
        console.log('Access the Private Route!')
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1]
        if(token == null) return res.sendStatus(401)
    
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
            if(err) return res.sendStatus(403)
            req.user = user
            next()
        })
    
    }
}

        
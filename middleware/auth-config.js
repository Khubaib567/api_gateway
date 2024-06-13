const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.auth= () => {
    return (req,res,next) =>{
        console.log('Access the Private Route!')
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1]
        if(token == null) return res.status(401).send({ message: "Access denied!" });
    
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
            if(err) return res.status(403).send({ message: "Please provide a valid token!" });
            req.user = user
            next()
        })
    
    }
}

        

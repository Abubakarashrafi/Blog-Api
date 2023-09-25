const jwt = require('jsonwebtoken')

const authentication = (req,res,next) => {
   try {
       let auth = req.headers.token;
      
      if (!(auth)) {
       return res.status(404).json('Invalid token') 
   } else {
        const token = auth.split(' ')[1]
       const data= jwt.verify(token,process.env.SECRET_KEY);
          req.user = data  
          next()    
      }
   } catch (err) {
    res.status(500).json('Authentication failed')
   }
}

const userAction = (req,res,next) =>{
  authentication(req,res, () => {
   if(req.user.id === req.params.id || req.user.isAdmin) {
      next()
   } else {
      res.status(401).json('You are not allowed to perform these actions')
   }
  })
}
const admin = (req,res,next) => {
   authentication(req,res, () => {
      if(req.user.isAdmin) {
         next()
      } else {
         res.status(403).json('You are not allowed to performed to these actions')
      }
   })
}
  
module.exports = {userAction,authentication,admin}
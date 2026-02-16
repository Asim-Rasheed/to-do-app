const jwt=require("jsonwebtoken");

const authenticatonToken = (req,res,next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token){
   return res.status(401).json({message: "No Token Provided!"})
  }
  jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
    if(err) return  res.status(401).json({message: "Invalid token"});
    req.user=user;
    next();})
}
module.exports={authenticatonToken}
const jwt = require("jsonwebtoken")
exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next(); // ye nhi lihka to request yahin atak jaayegi
        console.log(" JWT SECRET DURING VERIFY:", process.env.JWT_SECRET);
    }
    catch(error){
        return res.status(401).json({message: "Invalid Token"})
    }
};
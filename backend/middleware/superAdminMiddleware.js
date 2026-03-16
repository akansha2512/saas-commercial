exports.superAdminMiddleware = (req, res, next) => {
    if(req.user.role !== "super_admin"){
        return res.status(403).json({message:"Access Denied"});
    }
    next();
    console.log("ROLE IN MIDDLEWARE:", req.user.role);
}
const db = require("../config/db");
exports.storeAccessMiddleware = async(req,res,next) => {
   try {
    const {slug} = req.params;

    if (!slug) {
    return res.status(400).json({
        message: "Store slug is required"
    });
    }
    const userId = req.user.id;

    const [store] = await db.execute(
        "select id from stores where slug = ? and deleted_at is null",[slug]
    );
    if(store.length === 0){
        return res.status(404).json({
            message:"store not found"
        });
    }
    
    const storeId = store[0].id;
    const [rows] = await db.query(
        "select * from stores_users where user_id = ? and store_id = ?",[userId, storeId]
    );
    if(rows.length === 0){
        return res.status(403).json({
            message:"access denied"
        });
    }
    req.storeId = storeId;
    next();
   } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
   }
    //  Use this in product/order routes.
}

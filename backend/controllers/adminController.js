const db = require("../config/db");
exports.getPendingStores = async(req, res) => {
    try {
        const[stores] = await db.query(` SELECT s.id, s.name, s.status, 
           u.name AS owner_name, u.email FROM stores s LEFT JOIN stores_users su ON s.id = su.store_id LEFT JOIN users u ON su.user_id = u.id WHERE s.status = 'inactive'`);
        res.json(stores)
    } catch (error) {
        res.status(500).json({message:error.message}) //500 = server error
    }
};

exports.approveStore = async(req,res) => {
    const {id} = req.params;
    const connection = await db.getConnection();
    // try block + transaction start
    try {
        await connection.beginTransaction();
        const[stores] = await connection.query(`select id from stores where id = ?`,
            [id]);
        if(stores.length === 0){
            return res.status(404).json({message:"store not found"})
        }
       
        await connection.query("update stores set status = 'active' where id=?",[id]);
        // await connection.query("update users set status='active' where id=?", [ownerId]);
        await connection.commit();
        res.json({message: "Stores approved successfully"})
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: error.message });
    }
    // DB connection free karo
    // warna server slow ho jaata hai
    finally {
    connection.release();
    }
};

exports.rejectStore = async(req,res) => {
    const {id} = req.params;
    const connection = await db.getConnection();
    try {
       await connection.beginTransaction();
       const [stores] =await connection.query(`select id from stores where id=?`, [id]);
       if(stores.length === 0){
        return res.status(404).json({message:"store not found"});
       }
       
       await connection.query("update stores set status = 'disabled' where id=?",[id]);
       
       await connection.commit();
       res.json({message:"Stores rejected successfully"});
    } catch (error) {
        await connection.rollback();
        res.status(500).json({message: error.message});
    }
    finally{
        connection.release();
    }
}
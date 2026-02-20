const db = require("../config/db");
exports.getPendingStores = async(req, res) => {
    try {
        const[stores] = await db.query(`select s.id, s.name, s.status, u.name as owner_name, u.email from stores s join users u on s.owner_id = u.id where s.status = 'inactive'`);
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
        const[stores] = await connection.query("select owner_id from stores where id = ?", [id]);
        if(stores.length === 0){
            return res.status(404).json({message:"store not found"})
        }
        const ownerId = stores[0].owner_id;
        await connection.query("update stores set status = 'active' where id=?",[id]);
        await connection.query("update users set status='active' where id=?", [ownerId]);
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
       const [stores] =await connection.query("select owner_id from stores wheree id = ?", [id]);
       if(stores.length === 0){
        return res.status(404).json({message:"store not found"});
       }
       const ownerId = stores[0].owner_id;
       await connection.query("update stores set status = 'disabled' where id=?",[id]);
       await connection.query("update users ser status = 'blocked' where id=?", [ownerId]);
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
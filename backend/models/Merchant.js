const db = require("../config/db");
class Merchant{
    static async getList(){
        const[result] = await db.execute(
            `select u.id, u.name, u.email, u.phone, u.status, u.role, s.name as store_name, u.created_at from users u 
            left join stores_users su on u.id=su.user_id left join stores s on su.store_id = s.id where u.role = 'admin' and u.deleted_at is null` 
        );
        return result;
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute(
            `UPDATE users  SET status = ? WHERE id = ? AND role = 'admin' AND deleted_at IS NULL`,[status, id]
        );
        return result;
    }
}

module.exports = Merchant;
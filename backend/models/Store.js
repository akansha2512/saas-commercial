const db = require("../config/db");

class Store {
  static async createStore(connection, { userId, name, slug, description, logo }) {

    const [storeResult] = await connection.execute(
      `INSERT INTO stores (name, slug, status, logo, description) 
       VALUES (?, ?, 'inactive', ?, ?)`,
      [name, slug, logo, description]
    );

    const storeId = storeResult.insertId;

    await connection.execute(
      `INSERT INTO stores_users (user_id, store_id)
       VALUES (?, ?)`,
      [userId, storeId]
    );

    return {
      id: storeId,
      slug,
      status: "inactive"
    };
  }


    static async getStore(userId){
        const [result] = await db.execute(`SELECT s.id, s.name, s.slug, s.logo, s.status
       FROM stores s
       JOIN stores_users su ON s.id = su.store_id
       WHERE su.user_id = ? AND s.deleted_at IS NULL`,
      [userId]);
      return result;
    }

}
module.exports = Store;
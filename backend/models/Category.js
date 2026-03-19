const db = require("../config/db");
class Category{
    static async create(data){
        const{name,slug,description,status} = data;
        const[result] = await db.execute(
            `insert into categories(name, slug, description, status) values(?, ?, ?, ?)`,[name,slug,description,status]
        );
        return result;
    }

    static async findBySlug(slug){
        const[result] = await db.execute(
            `select * from categories where slug = ? AND deleted_at IS NULL limit 1`,[slug]
        );
        return result[0];
    }

    static async getList(){
        const[result] = await db.execute(
            // ` SELECT  c.*, COUNT(sc.id) AS total_subcategories FROM categories c JOIN sub_categories sc 
            // ON sc.category_id = c.id AND sc.deleted_at IS NULL AND sc.status = 'active' WHERE c.deleted_at IS NULL GROUP BY c.id ORDER BY c.id DESC`

             ` SELECT  c.*, COUNT(sc.id) AS total_subcategories FROM categories c JOIN sub_categories sc 
            ON sc.category_id = c.id AND sc.deleted_at IS NULL WHERE c.deleted_at IS NULL GROUP BY c.id ORDER BY c.id DESC`
        );
        return result;
    }

    static async update(id,data){
        const{name,slug,description} = data;
        const[result]= await db.execute(
            `update categories set name=?, slug=?, description=? where id=? AND deleted_at IS NULL`,[name,slug,description,id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute(
            `UPDATE categories 
             SET deleted_at = NOW(), status = 'inactive' 
             WHERE id = ?`,
            [id]
        );
        return result;
    }
}
module.exports  = Category;
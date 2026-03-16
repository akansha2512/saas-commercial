const db = require("../config/db");

class SubCategory{
    static async create({ categoryId, name, slug, description, status }){
        const[result] = await db.execute(`insert into sub_categories (category_id, name, slug, description, status) values (?, ?, ?, ?, ?)`, [categoryId, name, slug, description, status]);
        return result;
    }
    static async findBySlug(slug, categoryId){
    const [result] = await db.execute(
        `SELECT * FROM sub_categories 
         WHERE slug = ? AND category_id = ? AND deleted_at IS NULL 
         LIMIT 1`,
        [slug, categoryId]
    );
    return result[0];
    }
    static async getList(categoryId){
        const[result] = await db.execute(
            `select * from sub_categories where category_id = ? and deleted_at is null order by id desc`,[categoryId]
        );
        return result;
    }
    static async update(id,data){
        const{name,slug,description} = data;
        const[result]= await db.execute(
            `update sub_categories set name=?, slug=?, description=? where id=? AND deleted_at IS NULL`,[name,slug,description,id]
        );
        return result;
    }

    static async delete(id){
        const[result] = await db.execute(`UPDATE sub_categories 
             SET deleted_at = NOW(), status = 'inactive' 
             WHERE id = ?`,
            [id]);
            return result;
    }

}
module.exports = SubCategory;
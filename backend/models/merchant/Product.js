const db = require("../../config/db");
class Product{
    static async getCategory(){
        const[result] = await db.execute(
           `SELECT id, name FROM categories WHERE status = 'active' AND deleted_at IS NULL`
        );
        return result;
    }
    static async getSubCategory(category_id){
        const[result] = await db.execute(
            `select id, name from sub_categories WHERE category_id = ? AND status = 'active'
         AND deleted_at IS NULL`,[category_id]
        );
        return result;
    }
    // Check slug
    static async slugExists(slug, storeId) {
        const [rows] = await db.execute(
        `SELECT id FROM products 
        WHERE slug = ? AND store_id = ?`,
        [slug, storeId]
        );
        return rows.length > 0;
    }
    // Check SKU
    static async skuExists(sku, storeId) {
        const [rows] = await db.execute(
        `SELECT id FROM products 
        WHERE sku = ? AND store_id = ?`,
        [sku, storeId]
        );
        return rows.length > 0;
    }

    static async storeProduct(data){
        const{storeId, name, slug, category_id, sub_category_id, price, compare_price, stock, sku, status, description,image} = data;
        const[result] = await db.execute(`insert into products (store_id, name, slug, category_id, sub_category_id, price, compare_price, stock, sku, status, description,image) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [storeId, name, slug, category_id, sub_category_id, price, compare_price, stock, sku, status, description,image]
        );
        return result;
    }


}
module.exports = Product;
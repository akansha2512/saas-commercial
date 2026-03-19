const db = require("../../config/db");
// const { param } = require("../../routes/merchant/productRoutes");
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

static async getList(storeId, search, page = 1, limit = 5) {
    // const offset = (page - 1) * limit;

    const limitNum = parseInt(limit) || 5;
    const offsetNum = (parseInt(page) - 1) * limitNum;

    let query = `SELECT id, name, price, stock, status, image 
        FROM products 
        WHERE store_id = ? AND deleted_at IS NULL`;

    let count = `SELECT count(*) as total_product 
        FROM products 
        WHERE store_id = ? AND deleted_at IS NULL`;

    let params = [storeId];
    let countParams = [storeId];

    if (search && search.trim() !== "") {
        query += ` AND name LIKE ?`;
        count += ` AND name LIKE ?`;

        params.push(`%${search}%`);
        countParams.push(`%${search}%`);
    }

    // IMPORTANT FIX
    query += ` LIMIT ${limitNum} OFFSET ${offsetNum}`;

    // console.log(query, params);

    const [rows] = await db.execute(query, params);
    const [countRows] = await db.execute(count, countParams);

    return {
        data: rows,
        total: countRows[0].total_product,
    };
}

    static async update(id, storeId, data){
        const{ name, slug, category_id, sub_category_id,price, compare_price, stock, sku, status,description, image} = data;
        const [result] = await db.execute(`UPDATE products SET name = ?, slug = ?, category_id = ?, sub_category_id = ?, price = ?, compare_price = ?, stock = ?, sku = ?, status = ?, description = ?, image = ? WHERE id = ? AND store_id = ?`,
        [
            name,slug,category_id,sub_category_id,price,compare_price,stock,sku,status,description,image,id,storeId
        ]
    );

    return result;
    }

    static async delete(id, storeId){
        const[result] = await db.execute(`update products set deleted_at = NOW() where id=? and store_id = ?`, [id, storeId]);
        return result;
    }

    static async status(id, storeId, status){
        const[result] = await db.execute(`update products set status=? where id=? and store_id=?`, [status, id, storeId]);
        return result;
    }
}
module.exports = Product;
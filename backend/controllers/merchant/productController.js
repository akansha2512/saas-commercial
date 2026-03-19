const Product = require("../../models/merchant/Product");
const db = require("../../config/db");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp"); 
exports.getCategory = async(req,res) => {
    try {
        const categories = await Product.getCategory();
        return res.status(200).json({
            success:true,
            message:"Categories fetched successfully",
            data:categories,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.getSubCategory = async(req,res) =>{
    try {
        const{categoryId} = req.params;
        const subCategory = await Product.getSubCategory(categoryId);
        return res.status(200).json({
            success:true,
            message:"Sub Categories fetched successfully",
            data:subCategory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.createProducts = async(req, res) => {
    try {
        const storeId = req.storeId;
        const{name, category_id, sub_category_id, price, compare_price, stock, sku, status, description} = req.body || {};
        let baseSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

        let productSlug = baseSlug;
        let counter = 1;
        // Auto increment slug if exists
        while (await Product.slugExists(productSlug, storeId)) {
            productSlug = `${baseSlug}-${counter++}`;
        }

        // Check SKU duplicate inside same store
        if (await Product.skuExists(sku, storeId)) {
            return res.status(400).json({
                success: false,
                message: "SKU already exists in this store",
            });
        }
        // Image path (if uploaded)
        // const image = req.file ? req.file.filename : null;
        let imageName = null;
        if(req.file){
            const inputPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const compressName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
            const uploadPath = "uploads/products";
            const outputPath = path.join(uploadPath, compressName);
           

            let sharpInstance = sharp(inputPath).resize(300, 300);

            if (ext === ".jpg" || ext === ".jpeg") {
                sharpInstance = sharpInstance.jpeg({ quality: 70 });
            } else if (ext === ".png") {
                sharpInstance = sharpInstance.png({ quality: 70 });
            } else if (ext === ".webp") {
                sharpInstance = sharpInstance.webp({ quality: 70 });
            }

            await sharpInstance.toFile(outputPath);

            fs.unlinkSync(inputPath);

            imageName = compressName;
        }

        const products = await Product.storeProduct({
            storeId,name,slug:productSlug,category_id,sub_category_id,price,compare_price,stock,sku,status,description,image: imageName,
        });
        return res.status(201).json({
            success:true,
            message:"Product created successfully",
            data:products,
        })
    } catch (error) {
        console.error(error);

        // if (error.code === "ER_DUP_ENTRY") {
        // return res.status(400).json({
        //     message: "SKU or slug already exists in this store",
        // });
        // }

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.getProduct = async(req, res) => {
    try {
        const storeId = req.storeId;
        const search = req.query.search || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const products = await Product.getList(storeId, search, page, limit);
        return res.status(200).json({
            success:true,
            message:"Products list fetched successfully",
            data: products.data,
            total: products.total,
            page,
            limit
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.getSingleProduct = async (req, res) => {
   try {
    const { id } = req.params;
    const storeId = req.storeId;

        const [rows] = await db.execute(
            "SELECT * FROM products WHERE id=? AND store_id=?",
            [id, storeId]
        );

        return res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
                success: false,
                message: "Server error",
            });
    }
};
exports.update = async(req,res) => {
    try {
        const storeId = req.storeId;
        const {id} = req.params;

        const{name, category_id, sub_category_id, price, compare_price, stock, sku, status, description} = req.body || {};

        const [oldData] = await db.execute("select * from products where id=? and store_id = ? ",[id,storeId]);

        if(oldData.length == 0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            });
        }

        let imageName = oldData[0].image;
        let baseSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

        let productSlug = baseSlug;
        let counter = 1;
        // Auto increment slug if exists
        while (await Product.slugExists(productSlug, storeId)) {
            if (productSlug === oldData[0].slug) break;
            productSlug = `${baseSlug}-${counter++}`;
        }
        const [skuCheck] = await db.execute(
            `SELECT id FROM products WHERE sku = ? AND store_id = ? AND id != ?`,
            [sku, storeId, id]
        );

        if (skuCheck.length > 0) {
            return res.status(400).json({
                success: false,
                message: "SKU already exists"
            });
        }

        if (req.file) {
            const inputPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();

            const compressName =
                Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

            const outputPath = path.join("uploads/products", compressName);

            let sharpInstance = sharp(inputPath).resize(300, 300);

            if (ext === ".jpg" || ext === ".jpeg") {
                sharpInstance = sharpInstance.jpeg({ quality: 70 });
            } else if (ext === ".png") {
                sharpInstance = sharpInstance.png({ quality: 70 });
            } else if (ext === ".webp") {
                sharpInstance = sharpInstance.webp({ quality: 70 });
            }

            await sharpInstance.toFile(outputPath);

            // DELETE OLD IMAGE
            if (imageName) {
                const oldPath = path.join("uploads/products", imageName);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            fs.unlinkSync(inputPath);

            imageName = compressName;
        }

        await Product.update(id, storeId, {
            name,
            slug: productSlug,
            category_id,
            sub_category_id,
            price,
            compare_price,
            stock,
            sku,
            status,
            description,
            image: imageName
        });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.deleteProducts = async(req,res) => {
    try {
        const { id } = req.params;
        const storeId = req.storeId;
        const result = await Product.delete(id, storeId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.statusProducts = async(req,res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const storeId = req.storeId;
        await Product.status(id, storeId,status);

        return res.status(200).json({
            success:true,
            message:"Status updated successfully",
            
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}
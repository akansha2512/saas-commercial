const Product = require("../../models/merchant/Product");

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
        const image = req.file ? req.file.filename : null;
        const products = await Product.storeProduct({
            storeId,name,slug:productSlug,category_id,sub_category_id,price,compare_price,stock,sku,status,description,image,
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
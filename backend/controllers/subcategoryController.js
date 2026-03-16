const SubCategory = require("../models/SubCategory");

const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
};

exports.saveCategory = async(req,res) => {
    try {
        const {categoryId } = req.params;
        const{name, description} = req.body;
        if(!name){
            return res.status(400).json({
                status:false,
                message:"SubCategory name is required",
            })
        }
        const slug = generateSlug(name);
        const existing = await SubCategory.findBySlug(slug);
        if(existing){
            return res.status(400).json({
                status:false,
                message:"SubCategory already exists"
            });
        }

        await SubCategory.create({
            categoryId,
            name,
            slug,
            description:description||null,
            status:"active"
        });
        return res.status(201).json({
            success:true,
            message:"SubCategaory created successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}

exports.getSubCategory = async(req,res) => {
    try {
        const{categoryId} = req.params;
        const subCategory = await SubCategory.getList(categoryId);
        return res.status(200).json({
            success:true,
            message:"Sub Categories List fetched successfully",
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

exports.updateSubCategory = async(req,res) => {
    try {
        const {id} = req.params;
        const {name, description} = req.body;

        if(!name){
            return res.status(400).json({
                status:false,
                message:"SubCategory name is required",
            })
        }
        const slug = generateSlug(name);

        const existing = await SubCategory.findBySlug(slug, req.params.categoryId);

        if (existing && existing.id != id) {
            return res.status(400).json({
                success: false,
                message: "SubCategory already exists in this category",
            });
        }

        const result = await SubCategory.update(id, {
            name,
            slug,
            description: description || null,
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "SubCategory not found",
            });
        }

         return res.status(200).json({
            success: true,
            message: "SubCategory updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.deleteCategory = async(req,res) => {
    try {
        await SubCategory.delete(req.params.id);
        res.json({
            success: true,
            message: "Sub Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const Category = require("../models/Category");

const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
};

exports.storeCategory = async(req,res) =>{
    try {
        const{name, description} = req.body;
        if(!name){
            return res.status(400).json({
                status:false,
                message:"Category name is required",
            });
        }
        const slug = generateSlug(name);
        const existing = await Category.findBySlug(slug);
        if(existing){
            return res.status(400).json({
                status:false,
                message:"Category already exists"
            });
        }
        await Category.create({
            name,
            slug,
            description : description || null,
            status:"active",
        });
        return res.status(201).json({
            success: true,
            message: "Category created successfully",
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
}

exports.getCategory = async(req,res) => {
    try {
        const categories = await Category.getList();
        return res.status(200).json({
            success: true,
            message: "Categories list fetched successfully",
            data: categories,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }

}

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required",
            });
        }

        const slug = generateSlug(name);

        // check duplicate slug except current id
        const existing = await Category.findBySlug(slug);
        if (existing && existing.id != id) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists",
            });
        }

        const result = await Category.update(id, {
            name,
            slug,
            description: description || null,
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

exports.deleteCategory = async(req,res) => {
    try {
        await Category.delete(req.params.id);
        res.json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
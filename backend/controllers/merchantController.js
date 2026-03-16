const Merchant = require("../models/Merchant");


exports.getMerchant = async(req,res) => {
    try {
        const merchant = await Merchant.getList();
        return res.status(200).json({
            success:true,
            message:"Merchant list fetched successfully",
            data:merchant,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

exports.updateMerchantStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = ["active", "pending", "suspended", "blocked"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const result = await Merchant.updateStatus(id, status);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Merchant status updated to ${status}`
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error while updating merchant"
        });
    }
};
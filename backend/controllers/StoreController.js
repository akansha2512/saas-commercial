const db = require("../config/db");
const Store = require("../models/Store");

exports.createStore = async (req, res) => {
  const connection = await db.getConnection();

  try {
    const userId = req.user.id;
    const { name, description, logo } = req.body;

    await connection.beginTransaction();

    //slug generate
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    //call model
    const store = await Store.createStore(connection, {
      name,
      slug,
      description,
      logo,
      userId
    });

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Store created. Waiting for approval",
      store
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  } finally {
    connection.release();
  }
};

exports.getStore = async(req,res) => {
    try {
        const userId = req.user.id;
        const stores = await Store.getStore(userId);
        return res.status(200).json({
            success:true,
            message:"Categories fetched successfully",
            data:stores,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}
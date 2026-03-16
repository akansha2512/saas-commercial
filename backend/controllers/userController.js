const db = require("../config/db");

// Allowed status transitions
const allowedTransitions = {
  active: ["suspended", "blocked"],
  suspended: ["active", "blocked"],
  blocked: ["active"], // optional restore
};

exports.getUser = async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT u.id, u.name, u.email, u.phone, u.status, u.role,
             s.slug AS store
      FROM users u
      left join stores_users su on u.id=su.user_id left join stores s on su.store_id = s.id where u.role = 'admin' and u.deleted_at is null
    `);

     return res.status(200).json({
            success: true,
            message: "Users list fetched successfully",
            data: users,
        });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    //  Check user exists
    const [rows] = await connection.query(
      "SELECT status FROM users WHERE id = ? AND role = 'admin'",
      [id]
    );

    if (!rows.length) {
      await connection.rollback();
      return res.status(404).json({ message: "Merchant not found" });
    }

    const currentStatus = rows[0].status;

    // Prevent same status update
    if (currentStatus === status) {
      await connection.rollback();
      return res
        .status(400)
        .json({ message: "User already in this status" });
    }

    //  Validate transition
    if (!allowedTransitions[currentStatus]?.includes(status)) {
      await connection.rollback();
      return res.status(400).json({
        message: `Invalid transition from ${currentStatus} to ${status}`,
      });
    }

    //  Update user status
    await connection.query(
      "UPDATE users SET status = ? WHERE id = ?",
      [status, id]
    );

    await connection.commit();

    res.json({ message: `Status updated to ${status}` });

  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
};
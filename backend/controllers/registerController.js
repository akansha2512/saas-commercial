
const bcrypt = require("bcryptjs");
const db = require("../config/db");

exports.register= async (req, res) => {
    const { name, email, phone, password, storeName } = req.body;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        //Check if email already exists
        const [existingUser] = await connection.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUser.length > 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert User (role = admin, status = pending)
        const [userResult] = await connection.query(
            `INSERT INTO users (name, email, phone, password, role, status) 
             VALUES (?, ?, ?, ?, 'admin', 'pending')`,
            [name, email, phone, hashedPassword]
        );

        const userId = userResult.insertId;

        // Generate Slug Automatically
        const slug = storeName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        //  Insert Store (inactive by default)
        await connection.query(
            `INSERT INTO stores (name, slug, owner_id, status) 
             VALUES (?, ?, ?, 'inactive')`,
            [storeName, slug, userId]
        );

        await connection.commit();

        res.status(201).json({
            success: true,
            message: "Merchant registered successfully. Waiting for approval."
        });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        connection.release();
    }
};

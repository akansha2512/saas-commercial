const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? AND deleted_at IS NULL",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const user = users[0];
     console.log(" USER ROLE:", user.role);
    console.log(" USER STATUS:", user.status);
    console.log(" JWT SECRET DURING LOGIN:", process.env.JWT_SECRET);

  const statusMessages = {
    pending: "Your account is pending approval.",
    suspended: "Your account has been suspended. Contact support.",
    blocked: "Your account has been permanently blocked."
    };

    if (user.status !== "active") {
        return res.status(403).json({
            success: false,
            message: statusMessages[user.status] || "Account not allowed."
        });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    console.log(" PASSWORD MATCH:", isMatch);
    
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log("token", token);
    const [stores] = await db.query(
      `select s.id, s.name, s.slug from stores_users su join stores s on su.store_id = s.id where su.user_id = ?`,[user.id]
    );
    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      stores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({  message: error.message });
  }
};

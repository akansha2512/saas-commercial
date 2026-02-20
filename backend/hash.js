const bcrypt = require("bcryptjs");

async function hashPassword() {
  const password = "Admin@123"; 
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashed);
}

hashPassword();

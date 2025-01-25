import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

export const registerUser = async (user) => {
  console.log(user);

  try {
    const checkEmail = "SELECT * FROM employee WHERE email = ?";
    await pool.query(checkEmail, user.email, (err, result) => {
      if (err) return { success: false, message: "Database Error" }
      if (result.length > 0) {
        return { success: false, message: "Email already exists" }
      }
    })

    const sql = "INSERT INTO users (userName, email, mobile, password) VALUES (?)";
    const hashedPassword = bcrypt.hash(user.password, 10)
    const values = [user.userName, user.email, user.mobile, hashedPassword];
    await pool.query(sql, values)
    return {success: true, message: "User registered successfully"}

  } catch (error) {
    return {success: false, message: "Registration failed, Please try again later"}
  }
};

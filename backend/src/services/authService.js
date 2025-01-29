import bcrypt from "bcrypt";
import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (user) => {
  try {
    // Check if email already exists in the database
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    const [validEmail] = await pool.query(checkEmailQuery, [user.email]);

    if (validEmail.length > 0) {
      return { success: false, message: "Email already exists" };
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const insertUserQuery =
      "INSERT INTO users (`userName`, `email`, `mobile`, `password`) VALUES (?, ?, ?, ?)";

    const [result] = await pool.query(insertUserQuery, [
      user.userName,
      user.email,
      user.mobile,
      hashedPassword,
    ]);
    if (result.affectedRows === 0) {
      return { success: false, message: "User registration failed" };
    }
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "An error occurred during registration" };
  }
};

//LOGIN
export const userValidate = async (email, password, res) => {
  try {
    const sql = "SELECT * FROM users where email = ?";
    const [rows] = await pool.query(sql, [email]);
    if (rows.length === 0) {
      return { success: false, message: "Invalid credentials" };
    }
    const user = rows[0];
    const validPassword = await bcrypt.compare(
      password.toString(),
      user.password
    );
    if (!validPassword) {
      return { success: false, message: "Invalid email or password" };
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        userName: user.userName,
        email: user.email,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return { success: true, message: "Login Successfully", user };
  } catch (error) {
    console.log("Login Error", error);
    return { success: false, message: "Login Error occured" };
  }
};

// GET USER FROM TOKEN
export const getUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    const sql = "SELECT user_id, userName, mobile, email FROM users where user_id = ?";
    const [user] = await pool.query(sql, [decoded.id]);
    if (user.length === 0) {
      return { success: false, message: "User not found" };
    }
    return { success: true, user: user[0] };
  } catch (error) {
    console.error("Error retrieving user from token:", error);
    if (error.name === "TokenExpiredError") {
      return { success: false, message: "Token has expired" };
    }
    if (error.name === "JsonWebTokenError") {
      return { success: false, message: "Invalid token" };
    }
    return {
      success: false,
      message: "An error occurred while retrieving user",
    };
  }
};

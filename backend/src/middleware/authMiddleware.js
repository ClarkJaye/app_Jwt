import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Get user from database
    const [rows] = await pool.query(
      "SELECT user_id, userName, email FROM users WHERE user_id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found"
      });
    }

    // Add user info to request
    req.user = {
      user_id: rows[0].id,
      userName: rows[0].userName,
      email: rows[0].email
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed"
    });
  }
}; 
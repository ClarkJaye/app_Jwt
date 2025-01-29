import userModel from "../models/userModels.js";
import {
  getUser,
  registerUser,
  userValidate,
} from "../services/authService.js";

export const createUser = async (req, res) => {
  const { userName, email, mobile, password } = req.body;
  if (!userName || !email || !mobile || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const user = new userModel({ userName, email, mobile, password });
    const response = await registerUser(user);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
  return {
    success: false,
    message: "Regristration failed. Please try again later",
  };
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "email and password are required" });
  }
  try {
    const response = await userValidate(email, password, res);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserFromToken = async (req, res) => {
  const token = req.cookies.auth_token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }
  try {
    const response = await getUser(token);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return { success: false, message: "Failed to retrieve the data" };
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the auth token cookie
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout"
    });
  }
};
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const salt = 10;

// Login route
router.post("/login", async (req, res) => {
  try {
    const sql = "SELECT * FROM employee WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
      if (err) {
        return res.status(500).json({ Error: "Database Error" });
      }
      if (data.length === 0) {
        return res.status(401).json({ Error: "Invalid email or password" });
      }

      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) {
            return res.status(500).json({ Error: "Password compare error" });
          }
          if (!response) {
            return res.status(401).json({ Error: "Invalid email or password" });
          }

          const token = jwt.sign(
            { 
              id: data[0].emp_id, 
              name: data[0].name, 
              email: data[0].email 
            },
            process.env.JWT_SECRETKEY,
            { expiresIn: "1h" }
          );

          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 1000
          });

          return res.status(200).json({
            Status: "Success",
            Message: "Login Successfully!",
            user: {
              id: data[0].emp_id,
              name: data[0].name,
              email: data[0].email,
            },
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ Error: "Server Error" });
  }
});

// Register route
router.post("/register", (req, res) => {
  try {
    const checkEmail = "SELECT * FROM employee WHERE email = ?";
    db.query(checkEmail, [req.body.email], (err, result) => {
      if (err) {
        return res.status(500).json({ Error: "Database Error" });
      }
      if (result.length > 0) {
        return res.status(409).json({ Error: "Email already exists" });
      }

      const sql = "INSERT INTO employee (`name`, `email`, `password`) VALUES (?)";
      bcrypt.hash(req.body.password.toString(), salt, (err, hashPassword) => {
        if (err) {
          return res.status(500).json({ Error: "Error hashing password" });
        }
        const values = [req.body.name, req.body.email, hashPassword];
        db.query(sql, [values], (err, result) => {
          if (err) {
            return res.status(500).json({ Error: "Error creating user" });
          }
          return res
            .status(201)
            .json({ Status: "Success", Message: "Registered Successfully!" });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ Error: "Server Error" });
  }
});

// Verify user route
router.get("/verify-user", verifyToken, (req, res) => {
  try {
    res.status(200).json({ Status: "Success", user: req.user });
  } catch (error) {
    res.status(401).json({ Error: "Authentication failed" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ Status: "Success", Message: "Logged out successfully" });
});

export default router;
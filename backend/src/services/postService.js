import { pool } from "../config/db.js";

export const postCreate = async (post) => {
  try {
    const sql = "INSERT INTO posts (content, userName, user_id, created_at) VALUES (?, ?, ?, ?)";
    const values = [post.content, post.userName, post.user_id, post.created_at];
    const [result] = await pool.query(sql, values);
    
    if (result.affectedRows === 0) {
      return { success: false, message: "Post creation failed" };
    }

    // Fetch the created post
    const [newPost] = await pool.query(
      "SELECT * FROM posts WHERE id = ?",
      [result.insertId]
    );

    return { 
      success: true, 
      message: "Post created successfully",
      post: newPost[0]
    };
  } catch (error) {
    console.error("Post creation error:", error);
    return { success: false, message: "An error occurred" };
  }
};

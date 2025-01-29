import { pool } from "../config/db.js";

export const postCreate = async (post) => {
  try {
    const sql = "INSERT INTO posts (`content`, `user_id`) VALUES(?,?)";
    const values = [post.content, post.user_id];
    const [result] = pool.query(sql, [values]);
    if (result.affectedRows === 0) {
      return { success: false, message: "Post creation failed" };
    }
    return { success: true, message: "Post created successfully" };
  } catch (error) {
    return { success: false, message: "An error occurred" };
  }
};

import postModel from "../models/postModel.js";
import { postCreate } from "../services/postService.js";

export const createPost = async (req, res) => {
  const { content } = req.body;
  const { userName, user_id } = req.user; // Get from auth middleware
  try {
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Post content cannot be empty"
      });
    }

    const post = new postModel({
      content,
      userName,
      user_id,
      created_at: new Date()
    });

    const response = await postCreate(post);
    
    if (response.success) {
      return res.status(201).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    console.error("Create post error:", error);
    return res.status(500).json({
      success: false,
      message: "Create failed. Please try again later",
    });
  }
};

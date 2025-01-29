import postModel from "../models/postModel.js";
import { postCreate } from "../services/postService.js";

export const createPost = async (req, res) => {
  const { content, user_id } = req.body;
  try {
    const post = new postModel({content, user_id})
    const response = await postCreate(post);
    if(response.data.success){
        return res.status(200).json(response.data)
    }else{
        return res.status(400).json(response.data)
    }
  } catch (error) {
    return {
      success: false,
      message: "Create failed. Please try again later",
    };
  }
};

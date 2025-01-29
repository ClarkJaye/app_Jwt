import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/apiService";

interface Post {
  id: number;
  content: string;
  userName: string;
  user_id: string;
  created_at: string;
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: null,
};

// Create post
export const createPost = createAsyncThunk(
  "posts/create",
  async (content: string, { rejectWithValue }) => {
    try {
      const response = await api.post("/post/create", { content });
      if (!response.data.success) {
        return rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create post"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.post) {
          state.posts.unshift(action.payload.post);
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = postSlice.actions;
export default postSlice.reducer;

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../layouts/Header";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createPost, clearError } from "../store/slices/postSlice";

function Posts() {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error } = useAppSelector((state) => state.posts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    try {
      const res = await dispatch(createPost(content)).unwrap();
      console.log(res)
      setContent("");
      setIsModalOpen(false);
      toast.success("Post created successfully");
    } catch (err) {
      // Error is handled by the error useEffect
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-2 p-8">
        <h2 className="text-2xl text-center mb-2 font-semibold">My Posts</h2>

        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-2 bg-blue-600 text-[13px] text-white font-medium rounded
                     hover:bg-blue-700 active:bg-blue-800 
                     transition duration-150 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Post
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
                <form onSubmit={handleSubmit}>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-3 border rounded-lg mb-4 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setContent("");
                      }}
                      className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                    >
                      {isLoading ? "Posting..." : "Post"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.userName} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[16px] font-semibold text-gray-800">
                  {post.userName}
                </h2>
                <span className="text-[14px] text-gray-500">
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
              <div className="space-y-2">
                <p>{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Posts;


{/* <div className="bg-white rounded-lg shadow p-6 py-4">
<div className="flex items-center justify-between mb-4">
  <h2 className="text-[18px] font-semibold text-gray-800 ">
    Jay clark
  </h2>
  <span className="text-[16px]">10: 00 PM</span>
</div>
<div className="space-y-2">
  <span>sample test</span>
</div>
<div className="flex justify-end mt-4 gap-2">
  <button
    className="px-3 py-2 bg-green-600 text-[12px] text-white font-medium rounded
           hover:bg-green-700 active:bg-green-800 
           transition duration-150 ease-in-out
           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
  >
    Edit
  </button>
  <button
    className="px-3 py-2 bg-red-500 text-[12px] text-white font-medium rounded
           hover:bg-red-700 active:bg-red-600 
           transition duration-150 ease-in-out
           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
  >
    Delete
  </button>
</div>
</div> */}
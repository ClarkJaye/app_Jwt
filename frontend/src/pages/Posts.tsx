import Header from "../layouts/Header";

function Posts() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-2 p-8">
        <h2 className="text-2xl text-center mb-4 font-semibold">My Posts</h2>


        <div className="bg-white rounded-lg shadow p-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-gray-800 ">
              Jay clark
            </h2>
            <span className="text-[14px]">10: 00 PM</span>
          </div>
          <div className="space-y-2">
            <span>sample test</span>
          </div>
          <div className="flex justify-end mt-4 gap-2">
          <button
              className="px-3 py-2 bg-blue-600 text-[12px] text-white font-medium rounded
                     hover:bg-blue-700 active:bg-blue-800 
                     transition duration-150 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
        </div>

        
      </main>
    </>
  );
}

export default Posts;

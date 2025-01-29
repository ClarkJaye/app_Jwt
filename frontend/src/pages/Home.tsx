import Header from "../layouts/Header";
import { useAppSelector } from "../store/hooks";

function Home() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome, {user?.userName}!
          </h1>
          <div className="space-y-2">
            <p className="text-gray-600">

              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            {user?.mobile && (
              <p className="text-gray-600">
                <span className="font-semibold">Mobile:</span> {user?.mobile}
              </p>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

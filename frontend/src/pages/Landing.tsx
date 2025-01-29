import { Link } from "react-router-dom";
import Header from "../layouts/Header";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to BlogPost
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Share your thoughts and connect with others
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;

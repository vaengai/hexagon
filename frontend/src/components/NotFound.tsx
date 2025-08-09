import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="text-center space-y-8 p-8 max-w-md mx-auto">
        {/* Large 404 Text */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">Page Not Found</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Hexagon Icon/Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 transform rotate-45 rounded-lg opacity-20"></div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              Go Back Home
            </Button>
          </Link>
        </div>

        {/* Additional Help Text */}
        <div className="text-sm text-gray-400 pt-4">
          <p>Need help? Contact our support team or check our documentation.</p>
        </div>
      </div>
    </div>
  );
}

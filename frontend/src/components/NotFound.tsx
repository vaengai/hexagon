import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-neutral-950">
      <div className="text-center space-y-8 p-8 max-w-xl mx-auto">
        {/* Large 404 Text */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-blue-400 animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-500 text-lg leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/">
            <Button className="mx-auto w-full rounded-lg shadow-2xs hover:shadow-lg cursor-pointer p-2 flex flex-col items-center bg-sky-800 border-sky-600 shadow-sky-200 border-0 min-w-[140px] max-w-sm">
              Go Back Home
            </Button>
          </Link>
        </div>

        {/* Additional Help Text */}
        <div className="text-sm text-gray-500 dark:text-gray-400 pt-4">
          <p>Need help? Contact our support team or check our documentation.</p>
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HabitTable } from "./components/Habit/HabitTable";
import { useEffect } from "react";

import HexagonHome from "./components/HexagonHome";
import SignInPage from "./components/Login";
import About from "./components/About";
import UnderConstruction from "./components/UnderConstruction";
import HexagonLayout from "./components/HexagonLayout";
import NotFound from "./components/NotFound";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { useSyncProfile } from "./hooks/useSyncProfile";

export default function App() {
  const { isLoaded } = useUser();

  useSyncProfile();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Show loading while Clerk initializes
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* <div className="min-h-screen flex flex-col"> */}
      {/* <HexagonHome /> */}
      {/* <main className="flex-1"> */}
      <Router>
        <HexagonLayout>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/" element={<HexagonHome />} />
            <Route path="/UnderConstruction" element={<UnderConstruction />} />
            <Route
              path="/habit"
              element={
                <>
                  <SignedIn>
                    <HabitTable />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route path="/about" element={<About />} />
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HexagonLayout>
      </Router>
    </>
  );
}

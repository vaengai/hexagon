import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HabitTable } from "./components/Habit/HabitTable";
import { useEffect } from "react";

import HexagonHome from "./components/HexagonHome";
import SignInPage from "./components/Login";
import About from "./components/About";
import HexagonLayout from "./components/HexagonLayout";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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
          </Routes>
        </HexagonLayout>
      </Router>
    </>
  );
}

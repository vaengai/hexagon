import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
import { HabitTable } from "./components/Habit/HabitTable";
import { useEffect } from "react";
// import DotGrid from "./components/backgrounds/DotGrid/DotGrid";
import HexagonHome from "./components/HexagonHome";
import SignInPage from "./components/Login";
import About from "./components/About";
import HexagonLayout from "./components/HexagonLayout";
// import Footer from "./components/Footer";
// import { Layout } from "lucide-react";
// import ProfilePage from "./components/ProfilePage";
// function HabitLayout() {
//   return (
//     <div>
//       <Navbar />
//       <HabitTable />
//       <Footer />
//     </div>
//   );
// }
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
            <Route path="/habit" element={<HabitTable />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </HexagonLayout>
      </Router>
    </>
  );
}

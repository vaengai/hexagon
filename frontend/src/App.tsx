import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
import { HabitTable } from "./components/Habit/HabitTable";
import { useEffect } from "react";
// import DotGrid from "./components/backgrounds/DotGrid/DotGrid";
import HexagonBackground from "./components/HexagonBackground";

function HabitLayout() {
  return (
    <div>
      <Navbar />
      <HabitTable />
    </div>
  );
}
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
      {/* <HexagonBackground /> */}
      <Routes>
        <Route path="/" element={<HexagonBackground />} />
        <Route path="/habit" element={<HabitLayout />} />
      </Routes>
    </Router>
  );
}

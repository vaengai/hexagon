import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { HabitTable } from "./components/Habit/HabitTable";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
      <div className="relative overflow-x-hidden w-full min-h-screen bg-gradient-to-b from-neutral-950 to-stone-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/habit" element={<HabitTable />} />
        </Routes>
      </div>
    </Router>
  );
}

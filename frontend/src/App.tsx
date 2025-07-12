import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { HabitTable } from "./components/Habit/HabitTable";

export default function App() {
  return (
    <Router>
      <div className="overflow-x-hidden w-full min-h-screen bg-gradient-to-b from-neutral-950 to-stone-900 ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/habits" element={<HabitTable />} />
        </Routes>
      </div>
    </Router>
  );
}

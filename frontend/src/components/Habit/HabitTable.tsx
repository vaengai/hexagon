"use client";

import { columns } from "./columns";
import type { Habit } from "./columns";
import { DataTable } from "../ui/DataTable";

const habitData: Habit[] = [
  {
    id: "1",
    title: "Morning Run",
    status: "in_progress",
    category: "Health",
  },
  {
    id: "2",
    title: "Read 30 mins",
    status: "done",
    category: "Personal Development",
  },
  {
    id: "3",
    title: "Meditation",
    status: "pending",
    category: "Wellness",
  },
];

export function HabitTable() {
  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">My Habits</h2>
      <DataTable columns={columns} data={habitData} />
    </div>
  );
}

export default HabitTable;

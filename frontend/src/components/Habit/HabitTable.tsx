"use client";

import { columns } from "./columns";
import type { Habit } from "./columns";
import { DataTable } from "../ui/DataTable";

const habitData: Habit[] = [
  { id: "1", title: "Morning Run", status: "In Progress", category: "Health" },
  {
    id: "2",
    title: "Read 30 mins",
    status: "Done",
    category: "Personal Development",
  },
  { id: "3", title: "Meditation", status: "Pending", category: "Wellness" },
  { id: "4", title: "Drink 2L Water", status: "Done", category: "Health" },
  {
    id: "5",
    title: "Write Journal",
    status: "In Progress",
    category: "Mindfulness",
  },
  { id: "6", title: "Study Coding", status: "Pending", category: "Career" },
  {
    id: "7",
    title: "Practice Guitar",
    status: "In Progress",
    category: "Hobby",
  },
  { id: "8", title: "No Sugar", status: "Done", category: "Health" },
  { id: "9", title: "Stretch 10 mins", status: "Pending", category: "Fitness" },
  { id: "10", title: "Sleep by 10PM", status: "Done", category: "Wellness" },
  {
    id: "11",
    title: "Read News Brief",
    status: "In Progress",
    category: "Knowledge",
  },
  {
    id: "12",
    title: "Gratitude List",
    status: "Done",
    category: "Mindfulness",
  },
];
export function HabitTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 text-white">
      <h2 className="text-xl font-bold mb-4">My Habits</h2>
      <DataTable columns={columns} data={habitData} />
    </div>
  );
}

export default HabitTable;

"use client";

import { columns } from "./columns";
import type { Habit } from "./columns";
import { DataTable } from "../ui/DataTable";

const habitData: Habit[] = [
  {
    id: "1",
    title: "Morning Run",
    status: "In Progress",
    category: "Health",
    progress: 3,
    goal: 7,
  },
  {
    id: "2",
    title: "Read 30 mins",
    status: "Done",
    category: "Personal Development",
    progress: 7,
    goal: 7,
  },
  {
    id: "3",
    title: "Meditation",
    status: "Pending",
    category: "Wellness",
    progress: 1,
    goal: 7,
  },
  {
    id: "4",
    title: "Drink 2L Water",
    status: "Done",
    category: "Health",
    progress: 7,
    goal: 7,
  },
  {
    id: "5",
    title: "Write Journal",
    status: "In Progress",
    category: "Mindfulness",
    progress: 4,
    goal: 7,
  },
  {
    id: "6",
    title: "Study Coding",
    status: "Pending",
    category: "Career",
    progress: 0,
    goal: 7,
  },
  {
    id: "7",
    title: "Practice Guitar",
    status: "In Progress",
    category: "Hobby",
    progress: 2,
    goal: 5,
  },
  {
    id: "8",
    title: "No Sugar",
    status: "Done",
    category: "Health",
    progress: 7,
    goal: 7,
  },
  {
    id: "9",
    title: "Stretch 10 mins",
    status: "Pending",
    category: "Fitness",
    progress: 1,
    goal: 7,
  },
  {
    id: "10",
    title: "Sleep by 10PM",
    status: "Done",
    category: "Wellness",
    progress: 6,
    goal: 7,
  },
  {
    id: "11",
    title: "Read News Brief",
    status: "In Progress",
    category: "Knowledge",
    progress: 3,
    goal: 7,
  },
  {
    id: "12",
    title: "Gratitude List",
    status: "Done",
    category: "Mindfulness",
    progress: 7,
    goal: 7,
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

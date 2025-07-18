"use client";

import { columns } from "./columns";
import type { Habit } from "./columns";
import { DataTable } from "../ui/DataTable";

const habitData: Habit[] = [
  {
    id: "1",
    title: "Morning Run",
    status: "Pending",
    category: "Health",
    progress: 3,
    goal: 7,
    active: true,
  },
  {
    id: "2",
    title: "Read 30 mins",
    status: "Done",
    category: "Personal Development",
    progress: 7,
    goal: 7,
    active: true,
  },
  {
    id: "3",
    title: "Meditation",
    status: "Pending",
    category: "Wellness",
    progress: 1,
    goal: 7,
    active: true,
  },
  {
    id: "4",
    title: "Drink 2L Water",
    status: "Done",
    category: "Health",
    progress: 7,
    goal: 7,
    active: true,
  },
  {
    id: "5",
    title: "Write Journal",
    status: "Pending",
    category: "Mindfulness",
    progress: 4,
    goal: 7,
    active: true,
  },
  {
    id: "6",
    title: "Study Coding",
    status: "Pending",
    category: "Career",
    progress: 0,
    goal: 7,
    active: true,
  },
  {
    id: "7",
    title: "Practice Guitar",
    status: "Pending",
    category: "Hobby",
    progress: 2,
    goal: 5,
    active: true,
  },
  {
    id: "8",
    title: "No Sugar",
    status: "Done",
    category: "Health",
    progress: 7,
    goal: 7,
    active: true,
  },
  {
    id: "9",
    title: "Stretch 10 mins",
    status: "Pending",
    category: "Fitness",
    progress: 1,
    goal: 7,
    active: true,
  },
  {
    id: "10",
    title: "Sleep by 10PM",
    status: "Done",
    category: "Wellness",
    progress: 6,
    goal: 7,
    active: true,
  },
  {
    id: "11",
    title: "Read News Brief",
    status: "Pending",
    category: "Knowledge",
    progress: 3,
    goal: 7,
    active: true,
  },
  {
    id: "12",
    title: "Gratitude List",
    status: "Done",
    category: "Mindfulness",
    progress: 7,
    goal: 7,
    active: true,
  },
];
export function HabitTable() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <DataTable columns={columns} data={habitData} />
    </div>
  );
}

export default HabitTable;

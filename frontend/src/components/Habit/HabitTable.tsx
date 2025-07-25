"use client";

import { columns } from "./columns";
import { DataTable } from "../ui/DataTable";
import type { Habit } from "@/types/habit";
import { useEffect, useState } from "react";
import axios from "axios";

async function addHabitApi(newHabit: Omit<Habit, "id">): Promise<Habit> {
  console.log(newHabit);
  const response = await axios.post("http://localhost:8000/habit", newHabit);
  return response.data;
}

export function HabitTable() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddHabit, setShowAddHabit] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/habit")
      .then((response) => {
        setHabits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddHabit = async (habitData: Omit<Habit, "id">) => {
    const created = await addHabitApi(habitData);
    setHabits((prev) => [...prev, created]);
    setShowAddHabit(false);
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <DataTable
        columns={columns}
        data={habits}
        showAddHabit={showAddHabit}
        setShowAddHabit={setShowAddHabit}
        onAddHabit={handleAddHabit}
      />
    </div>
  );
}

export default HabitTable;

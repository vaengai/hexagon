"use client";

import { baseColumns } from "./columns";
import { DataTable } from "../ui/DataTable";
import type { Habit } from "@/types/habit";
import { useEffect, useState } from "react";
import axios from "axios";

async function addHabitApi(newHabit: Omit<Habit, "id">): Promise<Habit> {
  console.log(newHabit);
  const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit`;
  const response = await axios.post(url, newHabit);
  return response.data;
}

export function HabitTable() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddHabit, setShowAddHabit] = useState(false);

  const fetchHabits = () => {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit`;
    axios
      .get(url)
      .then((response) => setHabits(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async (habitData: Omit<Habit, "id">) => {
    const created = await addHabitApi(habitData);
    setHabits((prev) => [...prev, created]);
    setShowAddHabit(false);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const columns = baseColumns(handleDeleteHabit, fetchHabits);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <DataTable
        columns={columns}
        data={habits}
        showAddHabit={showAddHabit}
        setShowAddHabit={setShowAddHabit}
        onAddHabit={handleAddHabit}
        onDeleteHabit={handleDeleteHabit}
        refetchHabits={fetchHabits}
      />
    </div>
  );
}

export default HabitTable;

"use client";

import { baseColumns } from "./columns";
import { DataTable } from "../ui/DataTable";
import type { Habit } from "@/types/habit";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export function HabitTable() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const { getToken } = useAuth();

  const fetchHabits = async () => {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit`;
    const token = await getToken();
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setHabits(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteHabitApi = async (id: string): Promise<void> => {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}`;
    const token = await getToken();
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleDeleteHabit = async (id: string) => {
    await deleteHabitApi(id);
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const handleDone = async () => {
    setShowConfetti(false); // Hide first
    setTimeout(() => setShowConfetti(true), 10); // Show after a short delay
  };

  const columns = baseColumns(handleDeleteHabit, fetchHabits, handleDone);

  return (
    <div className="px-4 sm:px-6 lg:px-8 font-mono">
      <DataTable
        columns={columns}
        data={habits}
        onDeleteHabit={handleDeleteHabit}
        refetchHabits={fetchHabits}
        showConfetti={showConfetti}
        setShowConfetti={setShowConfetti}
        handleDone={handleDone}
      />
    </div>
  );
}

export default HabitTable;

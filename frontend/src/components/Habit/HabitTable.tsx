"use client";

import { baseColumns } from "./columns";
import { DataTable } from "../ui/DataTable";
import type { Habit } from "@/types/habit";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";

export function useSyncProfile() {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncProfile = async () => {
      const token = await getToken();
      await axios.get(`${import.meta.env.VITE_HEXAGON_API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };
    if (isSignedIn) {
      syncProfile();
    }
  }, [isSignedIn, getToken]);
}

export function HabitTable() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [showEditHabit, setShowEditHabit] = useState(false);
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

  const addHabitApi = async (newHabit: Omit<Habit, "id">): Promise<Habit> => {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit`;
    const token = await getToken();
    const response = await axios.post(url, newHabit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const editHabitApi = async (editHabit: Habit): Promise<Habit> => {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(editHabit.id)}`;
    const token = await getToken();
    const response = await axios.put(url, editHabit, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
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

  const handleAddHabit = async (habitData: Omit<Habit, "id">) => {
    const created = await addHabitApi(habitData);
    setHabits((prev) => [...prev, created]);
    setShowAddHabit(false);
  };

  const handleDeleteHabit = async (id: string) => {
    await deleteHabitApi(id);
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const handleEditHabit = async (habitData: Habit) => {
    const updated = await editHabitApi(habitData);
    setHabits((prev) =>
      prev.map((habit) => (habit.id === updated.id ? updated : habit))
    );
    setShowEditHabit(false);
  };

  const handleDone = async () => {
    setShowConfetti(false); // Hide first
    setTimeout(() => setShowConfetti(true), 10); // Show after a short delay
  };

  const columns = baseColumns(
    handleDeleteHabit,
    handleEditHabit,
    fetchHabits,
    handleDone
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 font-mono">
      <DataTable
        columns={columns}
        data={habits}
        showAddHabit={showAddHabit}
        setShowAddHabit={setShowAddHabit}
        onAddHabit={handleAddHabit}
        onDeleteHabit={handleDeleteHabit}
        refetchHabits={fetchHabits}
        showEditHabit={showEditHabit}
        setShowEditHabit={setShowEditHabit}
        onEditHabit={handleEditHabit}
        showConfetti={showConfetti}
        setShowConfetti={setShowConfetti}
        handleDone={handleDone}
      />
    </div>
  );
}

export default HabitTable;

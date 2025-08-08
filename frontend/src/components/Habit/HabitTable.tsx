"use client";

import { baseColumns } from "./columns";
import { DataTable } from "../ui/DataTable";
import type { Habit } from "@/types/habit";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export function HabitTable() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const orderRef = useRef<string[]>([]); // keeps stable order of habit IDs

  const { getToken } = useAuth();

  const sortByExistingOrder = useCallback((incoming: Habit[]) => {
    const existingOrder = orderRef.current;
    // First load: capture server order as the base order
    if (!existingOrder.length) {
      const ids = incoming.map((h) => h.id);
      orderRef.current = ids;
      return incoming;
    }

    // Map incoming by id for quick lookup
    const map = new Map<string, Habit>(incoming.map((h) => [h.id, h]));
    const sorted: Habit[] = [];

    // Keep existing items in the same relative order
    for (const id of existingOrder) {
      const h = map.get(id);
      if (h) {
        sorted.push(h);
        map.delete(id);
      }
    }

    // Append any new items to the end (e.g., newly created habits)
    for (const h of map.values()) {
      sorted.push(h);
    }

    // Update the stored order
    orderRef.current = sorted.map((h) => h.id);
    return sorted;
  }, []);

  const fetchHabits = useCallback(async () => {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit`;
    const token = await getToken();
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const stable = sortByExistingOrder(response.data as Habit[]);
        setHabits(stable);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [getToken, sortByExistingOrder]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleDeleteHabit = async (id: string) => {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}`;
    const token = await getToken();
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove from UI immediately and update order
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    orderRef.current = orderRef.current.filter((hid) => hid !== id);
  };

  const handleDone = async () => {
    setShowConfetti(false); // Hide first
    setTimeout(() => setShowConfetti(true), 10); // Show after a short delay
  };

  const columns = baseColumns(fetchHabits, handleDone);

  return (
    <div className="px-2 sm:px-4 lg:px-8 font-mono pt-6 sm:pt-8">
      <DataTable
        columns={columns}
        data={habits}
        onDeleteHabit={(id) => handleDeleteHabit(id)}
        refetchHabits={fetchHabits}
        showConfetti={showConfetti}
        setShowConfetti={setShowConfetti}
        handleDone={handleDone}
      />
    </div>
  );
}

export default HabitTable;

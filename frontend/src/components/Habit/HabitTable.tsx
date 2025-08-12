"use client";

import { baseColumns } from "./columns";
import { DataTable } from "../ui/DataTable";
import type { Habit } from "@/types/habit";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import AdvancedHorizontalDatePicker from "../AdvancedHorizontalDatePicker";

export function HabitTable() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const orderRef = useRef<string[]>([]); // keeps stable order of habit IDs

  const { getToken } = useAuth();

  const sortByExistingOrder = useCallback((incoming: Habit[]) => {
    const existingOrder = orderRef.current;
    // First load: capture server order as the base order
    if (!existingOrder.length) {
      const ids = incoming.map((h) => h.id);
      orderRef.current = ids;
      // Sort by active status: active habits first, then inactive
      return incoming.sort((a, b) => {
        if (a.active === b.active) return 0;
        return a.active ? -1 : 1; // active habits (-1) come before inactive (1)
      });
    }

    // Map incoming by id for quick lookup
    const map = new Map<string, Habit>(incoming.map((h) => [h.id, h]));
    const activeHabits: Habit[] = [];
    const inactiveHabits: Habit[] = [];

    // Keep existing items in the same relative order, but separate by active status
    for (const id of existingOrder) {
      const h = map.get(id);
      if (h) {
        if (h.active) {
          activeHabits.push(h);
        } else {
          inactiveHabits.push(h);
        }
        map.delete(id);
      }
    }

    // Append any new items to the appropriate list
    for (const h of map.values()) {
      if (h.active) {
        activeHabits.push(h);
      } else {
        inactiveHabits.push(h);
      }
    }

    // Combine active habits first, then inactive habits
    const sorted = [...activeHabits, ...inactiveHabits];

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // You can add logic here to filter habits by date if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-r via-slate-300 dark:from-zinc-950 dark:via-[#805D93] dark:to-zinc-950 ">
      <div className="pt-1 pb-8 px-2 sm:px-4 lg:px-8 font-mono">
        <AdvancedHorizontalDatePicker
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
          showToday={true}
          className="my-8"
          styles={{
            container: "bg-white bg-transparent rounded-lg",
            header: "mb-4",
            currentDateDisplay: "[&_h3]:text-xs [&_h3]:font-medium", // Target the h3 directly
            selectedDateItem:
              "!bg-blue-400 dark:text-white text-black scale-105",
            todayButton:
              "dark:bg-zinc-950 dark:bg-[#141518] border-2 border-black dark:border-white hover:border-zinc-600 rounded-lg dark:text-white text-xs py-1.5 px-3 transition-all duration-200",
            weekday: "text-xs",
            dayNumber: "text-sm font-medium",
            month: "text-xs",
          }}
        />
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
    </div>
  );
}

export default HabitTable;

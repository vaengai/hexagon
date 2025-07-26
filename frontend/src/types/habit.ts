import type { HabitFrequency } from "@/constants/habitFrequency";

export interface Habit {
  id: string;
  title: string;
  status: "PENDING" | "DONE";
  category: string;
  progress: number;
  target: number;
  frequency: HabitFrequency;
  active: boolean;
}

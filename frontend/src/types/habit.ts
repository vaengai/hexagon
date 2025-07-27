import type { HabitFrequency } from "@/types/habitFrequency";
import type { HabitCategory } from "@/types/habitCategory";
import type { HabitStatus } from "@/types/habitStatus";

export interface Habit {
  id: string;
  title: string;
  status: HabitStatus;
  category: HabitCategory;
  progress: number;
  target: number;
  frequency: HabitFrequency;
  active: boolean;
}

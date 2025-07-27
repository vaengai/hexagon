export const HABIT_FREQUENCY = [
  "Daily",
  "Weekly",
  "Bi-weekly",
  "Monthly",
] as const;

export type HabitFrequency = (typeof HABIT_FREQUENCY)[number];

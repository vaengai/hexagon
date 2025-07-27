export const HABIT_FREQUENCY = ["Day", "Week", "Month"] as const;

export type HabitFrequency = (typeof HABIT_FREQUENCY)[number];

export const HABIT_STATUS = ["PENDING", "DONE"] as const;

export type HabitStatus = (typeof HABIT_STATUS)[number];

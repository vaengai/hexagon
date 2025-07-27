export const HABIT_STATUS = ["Pending", "Done"] as const;

export type HabitStatus = (typeof HABIT_STATUS)[number];

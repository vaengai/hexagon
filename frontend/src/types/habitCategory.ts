export const HABIT_CATEGORIES = [
  "Health",
  "Wellness",
  "Fitness",
  "Mindfulness",
  "Personal Development",
  "Career",
  "Hobby",
  "Knowledge",
  "Productivity",
  "Relationships",
  "Other",
] as const;

// Optional: Create a union type for strict typing
export type HabitCategory = (typeof HABIT_CATEGORIES)[number];

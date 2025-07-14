export interface Habit {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Done";
  category: string;
  progress: number;
  goal: number;
  active: boolean;
}
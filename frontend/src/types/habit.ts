export interface Habit {
  id: string;
  title: string;
  status: "PENDING" | "DONE";
  category: string;
  progress: number;
  goal: number;
  active: boolean;
}

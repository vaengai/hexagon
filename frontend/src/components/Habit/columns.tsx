"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type Habit = {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "done";
  category: string;
};

export const columns: ColumnDef<Habit>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Type",
  },
];

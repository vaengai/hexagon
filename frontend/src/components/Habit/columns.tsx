"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusButton from "./StatusButton";
import type { Habit } from "@/types/habit";
import Action from "./Action";
import ToggleActive from "./ToggleActive";
export const baseColumns = (
  onDeleteHabit: (id: string) => void
): ColumnDef<Habit>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Habit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <StatusButton
        habitTitle={row.original.title}
        initialStatus={row.original.status}
      />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "goal",
    header: "Goal",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      // <Switch id="active-status-ind" defaultChecked={row.original.active} />
      <ToggleActive habitId={row.original.id} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Action habitId={row.original.id} onDelete={onDeleteHabit} />
    ),
  },
];

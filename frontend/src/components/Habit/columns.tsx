"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusButton from "./StatusButton";
import type { Habit } from "@/types/habit";
import Action from "./Action";
import ToggleActive from "./ToggleActive";

function toTitleCase(word: string) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
}

export const baseColumns = (
  onDeleteHabit: (id: string) => void,
  refetchHabits: () => void
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
        id={row.original.id}
        initialStatus={row.original.status}
        refetchHabits={refetchHabits}
        disabled={row.original.active}
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
    accessorKey: "target",
    header: "Target",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => toTitleCase(row.original.frequency),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      // <Switch id="active-status-ind" defaultChecked={row.original.active} />
      <ToggleActive
        habitId={row.original.id}
        currentState={row.original.active}
        refetchHabits={refetchHabits}
      />
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

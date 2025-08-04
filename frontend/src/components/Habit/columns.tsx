"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusButton from "./StatusButton";
import type { Habit } from "@/types/habit";
import Action from "./Action";
import ToggleActive from "./ToggleActive";

export const baseColumns = (
  onDeleteHabit: (id: string) => void,
  refetchHabits: () => void,
  handleDone: () => void
): ColumnDef<Habit>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="none"
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
          variant="none"
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
        initialStatus={row.original.status.toUpperCase()}
        refetchHabits={refetchHabits}
        disabled={!row.original.active}
        onDone={handleDone}
      />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="none"
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
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
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
      <Action
        habitId={row.original.id}
        onEdit={handleEditHabit(row.original)}
        onDelete={onDeleteHabit}
      />
    ),
  },
];

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  IconCircleCheckFilled,
  IconLoader,
  IconDotsVertical,
} from "@tabler/icons-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@headlessui/react";

import type { Habit } from "@/types/habit";
import Action from "./Action";
export const columns: ColumnDef<Habit>[] = [
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
      <Badge className="text-md text-muted-foreground px-2 bg-background outline-1">
        {row.original.status === "Done" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
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
    cell: () => <Switch id="active-status-ind" />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => <Action />,
  },
];

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Habit = {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Done";
  category: string;
};

export const columns: ColumnDef<Habit>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className="text-base text-muted-foreground px-4 border-neutral-700">
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
    header: "Category",
  },
];

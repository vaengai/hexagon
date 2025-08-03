import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
// import { useAuth } from "@clerk/clerk-react";
// import axios from "axios";
// import type { Habit } from "@/types/habit";

export default function Action({
  habitId,
  onDelete,
  onEdit,
}: {
  habitId: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
}) {
  const handleDelete = async () => {
    onDelete(habitId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8 "
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onSelect={onEdit}>
          <IconPencil />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
          <IconTrash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

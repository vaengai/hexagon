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
// import { Habit } from "@/types/habit";
import axios from "axios";

async function deleteHabitApi(id: string) {
  const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}`;

  const response = await axios.delete(url);
  return response.data;
}

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
    await deleteHabitApi(habitId);
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

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";

async function toggleActiveApi(id: string): Promise<boolean> {
  const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}/toggle-active`;
  const response = await axios.patch(url);
  return response.data.active;
}

export default function ToggleActive({
  habitId,
  currentState,
  refetchHabits,
}: {
  habitId: string;
  currentState: boolean;
  refetchHabits: () => void;
}) {
  const [active, setActive] = useState<boolean>(currentState);

  const handleToggle = async () => {
    const isActive = await toggleActiveApi(habitId);
    setActive(isActive);
    refetchHabits();
  };

  return (
    <Switch
      id="active-status-ind"
      checked={active}
      onCheckedChange={handleToggle}
    />
  );
}

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";

async function toggleActiveApi(id: string): Promise<boolean> {
  const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}/toggle-active`;
  const response = await axios.patch(url);
  return response.data;
}

export default function ToggleActive({ habitId }: { habitId: string }) {
  const [active, setActive] = useState<boolean>(true);

  const handleToggle = () => {
    const status = !active;
    setActive(status);
    toggleActiveApi(habitId);
  };

  return (
    <Switch
      id="active-status-ind"
      defaultChecked={active}
      onCheckedChange={handleToggle}
    />
  );
}

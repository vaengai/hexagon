import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

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
  const { getToken } = useAuth();

  async function toggleActiveApi(id: string): Promise<boolean> {
    const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}/toggle-active`;
    const token = await getToken();
    const response = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.active;
  }

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

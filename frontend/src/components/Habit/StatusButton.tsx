import { Button } from "@headlessui/react";
import { useState } from "react";
import { statusColors } from "@/constants/statusColors";
import axios from "axios";

async function updateStatusApi(id: string, status: string): Promise<string> {
  const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}/status/${encodeURIComponent(status)}`;

  const response = await axios.patch(url);
  console.log("response from updateStatusApi", response.data);
  return response.data.status;
}

export default function StatusButton({
  id,
  initialStatus,
  refetchHabits,
  disabled,
}: {
  id: string;
  initialStatus: string;
  refetchHabits: () => void;
  disabled: boolean;
}) {
  const [status, setStatus] = useState(initialStatus);

  const handleClick = async () => {
    const newStatus = status === "PENDING" ? "DONE" : "PENDING";
    setStatus(newStatus);
    await updateStatusApi(id, newStatus);
    refetchHabits();
  };

  return (
    <Button
      onClick={() => handleClick()}
      disabled={!disabled}
      className={`inline-block ${statusColors[status.toLowerCase()] || "bg-gray-500"} text-white text-xs font-semibold px-3 py-1 rounded cursor-pointer ${
        !disabled ? "bg-muted cursor-not-allowed" : ""
      }`}
    >
      {status}
    </Button>
  );
}

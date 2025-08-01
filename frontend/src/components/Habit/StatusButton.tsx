import { Button } from "@headlessui/react";
import { useState } from "react";
import { statusColors } from "@/constants/statusColors";
import axios from "axios";
// import { HABIT_STATUS } from "@/types/habitStatus";

async function updateStatusApi(id: string, status: string): Promise<string> {
  const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(id)}/status/${encodeURIComponent(status)}`;

  const response = await axios.patch(url);
  return response.data.status;
}

export default function StatusButton({
  id,
  initialStatus,
  refetchHabits,
  disabled,
  onDone = () => {},
}: {
  id: string;
  initialStatus: string;
  refetchHabits: () => void;
  disabled: boolean;
  onDone?: () => void;
}) {
  const [status, setStatus] = useState(initialStatus);

  const handleClick = async () => {
    const newStatus = status.toLowerCase() === "pending" ? "Done" : "Pending";
    setStatus(newStatus);
    if (newStatus === "Done") {
      onDone();
    }
    await updateStatusApi(id, newStatus);
    refetchHabits();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={disabled}
        className={`inline-block ${statusColors[status.toLowerCase()] || "bg-gray-500"} text-white text-sm font-semibold px-3 py-1 rounded cursor-pointer ${
          disabled ? "bg-muted cursor-not-allowed" : ""
        }`}
      >
        {status}
      </Button>
    </>
  );
}

import { Button } from "@headlessui/react";
import { useState } from "react";
import { statusColors } from "@/constants/statusColors";
import axios from "axios";

async function updateStatusApi(
  habitTitle: string,
  status: string
): Promise<string> {
  const url = `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/habit/${encodeURIComponent(habitTitle)}/status/${encodeURIComponent(status)}`;

  const response = await axios.patch(url);
  return response.data;
}

export default function StatusButton({
  habitTitle,
  initialStatus,
}: {
  habitTitle: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);

  const handleClick = () => {
    const newStatus = status === "PENDING" ? "DONE" : "PENDING";
    setStatus(newStatus);
    updateStatusApi(habitTitle, newStatus);
  };

  return (
    <Button
      onClick={() => handleClick()}
      className={`inline-block ${statusColors[status.toLowerCase()] || "bg-gray-500"} text-white text-xs font-semibold px-3 py-1 rounded cursor-pointer`}
    >
      {status}
    </Button>
  );
}

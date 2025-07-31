import { Button } from "@headlessui/react";
import { useState } from "react";
import { statusColors } from "@/constants/statusColors";
import axios from "axios";
import { HABIT_STATUS } from "@/types/habitStatus";
import * as React from "react";
import Confetti from "react-confetti";

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
}: {
  id: string;
  initialStatus: string;
  refetchHabits: () => void;
  disabled: boolean;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleClick = async () => {
    console.log("Button clicked");
    const newStatus = status.toLowerCase() === "pending" ? "Done" : "Pending";
    setStatus(newStatus);
    if (newStatus === "Done") {
      console.log("Status is Done, show is true");
      setShowConfetti(true);
    }
    await updateStatusApi(id, newStatus);
    refetchHabits();
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
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

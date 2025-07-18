import { Button } from "@headlessui/react";
import { useState } from "react";
import { statusColors } from "@/constants/statusColors";

export default function StatusButton({
  initialStatus,
}: {
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);

  const handleClick = () => {
    setStatus((prev) => (prev === "PENDING" ? "DONE" : "PENDING"));
  };

  return (
    <Button
      onClick={() => handleClick()}
      className={`inline-block ${statusColors[status.toLowerCase()] || "bg-gray-500"} text-white text-xs font-semibold px-3 py-1 rounded`}
    >
      {status}
    </Button>
  );
}

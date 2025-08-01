import { UserProfile } from "@clerk/clerk-react";

export default function ProfilePage({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-background p-6 rounded-lg shadow-xl max-w-4xl w-full h-[90vh] overflow-auto">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white text-sm"
            onClick={onClose}
          >
            Close ✕
          </button>
        </div>
        <UserProfile
          appearance={{
            elements: {
              rootBox: "font-mono text-base",
              card: "shadow-none border-none",
              headerTitle: "text-2xl font-bold",
              profileSectionPrimaryButton: "bg-primary text-white",
            },
          }}
        />
      </div>
    </div>
  );
}

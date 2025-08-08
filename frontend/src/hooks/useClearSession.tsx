import { useClerk } from "@clerk/clerk-react";

export const useClearSession = () => {
  const { signOut } = useClerk();

  const clearSessionAndReload = async () => {
    try {
      // Sign out from Clerk
      await signOut();

      // Clear any app-specific localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("profileSynced:")) {
          localStorage.removeItem(key);
        }
      });

      // Force page reload to clear any cached state
      window.location.href = "/";
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  return { clearSessionAndReload };
};

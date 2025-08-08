import { useEffect } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";

export function useSyncProfile() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncProfile = async () => {
      try {
        const token = await getToken();
        await axios.get(
          `${import.meta.env.VITE_HEXAGON_API_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem(`profileSynced:${user?.id}`, "true");
      } catch (error) {
        console.error("Profile sync failed:", error);
      }
    };

    if (
      isSignedIn &&
      user?.id &&
      localStorage.getItem(`profileSynced:${user.id}`) !== "true"
    ) {
      syncProfile();
    }
  }, [isSignedIn, user?.id, getToken]); // Add dependencies to prevent infinite rerenders
}

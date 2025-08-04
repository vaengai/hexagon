import { useEffect } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";

export function useSyncProfile() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncProfile = async () => {
      const token = await getToken();
      await axios.get(`${import.meta.env.VITE_HEXAGON_API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem(`profileSynced:${user?.id}`, "true");
    };
    if (
      isSignedIn &&
      user?.id &&
      localStorage.getItem(`profileSynced:${user.id}`) !== "true"
    ) {
      syncProfile();
    }
  });
}


import { create } from "zustand";

type AuthStore = {
  currentUser: string | null;
  signIn: (accountName: string, password: string) => boolean;
  signOut: () => void;
};

function getSavedUser() {
  const savedToken = sessionStorage.getItem("mydishToken");

  if (savedToken?.startsWith("demo:")) {
    return savedToken.slice(5);
  }

  return null;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: getSavedUser(),

  signIn: (accountName, password) => {
    const cleanName = accountName.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,20}$/.test(cleanName) || password !== "demo123") {
      return false;
    }

    sessionStorage.setItem("mydishToken", `demo:${cleanName}`);

    set({ currentUser: cleanName });
    return true;
  },

  signOut: () => {
    sessionStorage.removeItem("mydishToken");
    set({ currentUser: null });
  }
}));

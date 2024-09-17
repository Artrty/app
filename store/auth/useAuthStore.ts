import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  isLoggedIn: boolean;
  userId: string | null;
  token: string | null;
};

type Action = {
  login: () => void;
  logout: () => void;
  setUserId: (userId: string) => void;
  setToken: (token: string) => void;
};

export const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      isLoggedIn: false,
      userId: null,
      token: null,
      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          userId: null,
          token: null,
        }),

      setUserId: (userId: string) => set({ userId }),
      setToken: (token: string) =>
        set({
          token,
        }),
    }),
    {
      name: 'userInfoStorage', //Storage 이름 지정 (default: localStorage)
    }
  )
  //)
);

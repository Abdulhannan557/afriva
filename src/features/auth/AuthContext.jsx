
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';

import { authService } from '@/features/auth/authService';
import { storage } from '@/utils/storage';

const SESSION_KEY = 'afriva_session';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(
    () => storage.get(SESSION_KEY)
  );

  const start = useCallback((data) => {
    storage.set(SESSION_KEY, data);
    setSession(data);
    return data;
  }, []);

  // Login creates a frontend session
  const login = useCallback(
    async (payload) => {
      const data = await authService.login(payload);
      return start(data);
    },
    [start]
  );

  // Registration does not create a session.
  // The user must verify their email first.
  const register = useCallback(
    async (payload) => {
      return await authService.register(payload);
    },
    []
  );

  // Email verification
  const verifyEmail = useCallback(
    async (token) => {
      return await authService.verifyEmail(token);
    },
    []
  );

  const logout = useCallback(() => {
    storage.remove(SESSION_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.user),
      login,
      register,
      verifyEmail,
      logout,
    }),
    [session, login, register, verifyEmail, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      'useAuth must be used inside <AuthProvider>'
    );
  }

  return ctx;
}

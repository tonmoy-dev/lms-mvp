"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  getSession,
  signIn as authSignIn,
  signOut as authSignOut,
  registerUser as authRegister,
  SessionUser,
} from "@/lib/auth";

interface AuthContextValue {
  user: SessionUser | null;
  isLoading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setUser(getSession());
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const session = authSignIn(email, password);
    if (!session) {
      return {
        success: false,
        error:
          "Invalid email or password. Try alex@devpath.com / password123",
      };
    }
    setUser(session);
    return { success: true };
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      const session = authRegister(name, email);
      setUser(session);
      return { success: true };
    },
    []
  );

  const handleSignOut = useCallback(() => {
    authSignOut();
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, register, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

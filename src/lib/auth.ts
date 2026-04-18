export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "instructor";
  initials: string;
  avatarColor: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor";
  initials: string;
  avatarColor: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "u1",
    name: "Demo User",
    email: "rx@gmail.com",
    password: "password123",
    role: "student",
    initials: "RX",
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
];

const SESSION_KEY = "devpath_session";
const COOKIE_NAME = "devpath_auth";

export function signIn(email: string, password: string): SessionUser | null {
  const user = mockUsers.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return null;
  const session: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    initials: user.initials,
    avatarColor: user.avatarColor,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  }
  return session;
}

export function registerUser(
  name: string,
  email: string,
): SessionUser {
  const initials = name
    .split(" ")
    .map((p) => p[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const session: SessionUser = {
    id: `u_${Date.now()}`,
    name,
    email,
    role: "student",
    initials,
    avatarColor: "bg-emerald-100 text-emerald-700",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  }
  return session;
}

export function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

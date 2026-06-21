import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { categories as mockCategories } from '../data/categories';
import { professionals as mockProfessionals } from '../data/professionals';
import { Category, Professional, User } from '../types';

// Result type for auth actions so screens can show error messages.
interface AuthResult {
  success: boolean;
  message?: string;
}

// Shape of the global app state exposed to all screens.
interface AppContextValue {
  user: User | null;
  professionals: Professional[];
  categories: Category[];
  // Auth actions work fully in memory, no real API.
  login: (email: string, password: string) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

// A demo account so the user can log in without registering first.
const DEMO_USER: User = {
  id: 'user-demo',
  name: 'Jan Kowalski',
  email: 'jan@fachowiec.pl',
};
const DEMO_PASSWORD = 'haslo123';

export const AppProvider: React.FC<Props> = ({ children }) => {
  // The logged in user. Null means nobody is logged in.
  const [user, setUser] = useState<User | null>(null);
  // Data lives in memory and never changes here, but stays in state
  // so we could mutate it later if needed.
  const [professionals] = useState<Professional[]>(mockProfessionals);
  const [categories] = useState<Category[]>(mockCategories);

  // Validate the demo credentials and log the user in.
  const login = useCallback((email: string, password: string): AuthResult => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, message: 'Podaj email i hasło.' };
    }
    if (cleanEmail === DEMO_USER.email && password === DEMO_PASSWORD) {
      setUser(DEMO_USER);
      return { success: true };
    }
    return { success: false, message: 'Nieprawidłowy email lub hasło.' };
  }, []);

  // Create a new in memory user and log them in right away.
  const register = useCallback(
    (name: string, email: string, password: string): AuthResult => {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanName || !cleanEmail || !password) {
        return { success: false, message: 'Wypełnij wszystkie pola.' };
      }
      if (password.length < 6) {
        return {
          success: false,
          message: 'Hasło musi mieć co najmniej 6 znaków.',
        };
      }
      setUser({
        id: `user-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
      });
      return { success: true };
    },
    []
  );

  // Clear the user to return to the auth flow.
  const logout = useCallback(() => setUser(null), []);

  // Memoize the value so consumers do not re-render needlessly.
  const value = useMemo<AppContextValue>(
    () => ({ user, professionals, categories, login, register, logout }),
    [user, professionals, categories, login, register, logout]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to read the app context with a helpful error if used outside provider.
export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp musi być użyty wewnątrz AppProvider');
  }
  return ctx;
};

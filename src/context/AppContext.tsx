import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { categories as mockCategories } from '../data/categories';
import { professionals as mockProfessionals } from '../data/professionals';
import { Category, Professional, User } from '../types';

// AsyncStorage keys
const STORAGE_KEY_PROFESSIONALS = '@fachowiec/professionals';
const STORAGE_KEY_USER = '@fachowiec/user';

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
  loading: boolean; // true during initial AsyncStorage load
  // Auth actions
  login: (email: string, password: string) => AuthResult;
  register: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
  // Data mutations – add a new professional, persisted to AsyncStorage
  addProfessional: (professional: Professional) => void;
  removeProfessional: (id: string) => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [categories] = useState<Category[]>(mockCategories);
  const [loading, setLoading] = useState(true);

  // Load saved data on mount.
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedProfessionals, savedUser] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY_PROFESSIONALS),
          AsyncStorage.getItem(STORAGE_KEY_USER),
        ]);
        if (savedProfessionals) {
          const parsed = JSON.parse(savedProfessionals) as Professional[];
          // Jeśli zapisane dane są niepuste, użyj ich; w przeciwnym razie fallback do mocków
          setProfessionals(parsed.length > 0 ? parsed : mockProfessionals);
        } else {
          setProfessionals(mockProfessionals);
        }
        if (savedUser) {
          setUser(JSON.parse(savedUser) as User);
        }
      } catch {
        // Fallback to mock data on any error
        setProfessionals(mockProfessionals);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Persist professionals whenever they change (skip the empty initial state).
  useEffect(() => {
    if (professionals.length > 0 && !loading) {
      AsyncStorage.setItem(
        STORAGE_KEY_PROFESSIONALS,
        JSON.stringify(professionals)
      ).catch(() => {});
    }
  }, [professionals, loading]);

  // Persist user whenever it changes.
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user)).catch(
        () => {}
      );
    } else if (!loading) {
      AsyncStorage.removeItem(STORAGE_KEY_USER).catch(() => {});
    }
  }, [user, loading]);

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

  // Add a new professional (prepended to the list) and persist.
  const addProfessional = useCallback((professional: Professional) => {
    setProfessionals((prev) => [professional, ...prev]);
  }, []);

  // Remove a professional by id.
  const removeProfessional = useCallback((id: string) => {
    setProfessionals((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Memoize the value so consumers do not re-render needlessly.
  const value = useMemo<AppContextValue>(
    () => ({
      user,
      professionals,
      categories,
      loading,
      login,
      register,
      logout,
      addProfessional,
      removeProfessional,
    }),
    [
      user,
      professionals,
      categories,
      loading,
      login,
      register,
      logout,
      addProfessional,
      removeProfessional,
    ]
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
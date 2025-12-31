import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'blue' | 'green' | 'red' | 'dark' | 'light';

interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  accentHover: string;
  gradient: string;
  gradientText: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
}

const themes: Record<ThemeType, ThemeColors> = {
  blue: {
    primary: 'bg-primary',
    primaryHover: 'hover:bg-dark',
    primaryLight: 'bg-primary/20',
    secondary: 'bg-secondary',
    secondaryHover: 'hover:bg-secondary/80',
    accent: 'text-primary',
    accentHover: 'hover:text-primary',
    gradient: 'from-primary to-secondary',
    gradientText: 'from-primary via-secondary to-dark',
    background: 'bg-bg',
    surface: 'bg-white',
    text: 'text-text',
    textSecondary: 'text-text/70',
    border: 'border-primary',
    shadow: 'shadow-primary/30',
  },
  green: {
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryLight: 'bg-emerald-500/20',
    secondary: 'bg-green-600',
    secondaryHover: 'hover:bg-green-700',
    accent: 'text-emerald-400',
    accentHover: 'hover:text-emerald-400',
    gradient: 'from-emerald-600 to-green-600',
    gradientText: 'from-emerald-400 via-green-400 to-teal-400',
    background: 'bg-white',
    surface: 'bg-slate-50',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    border: 'border-emerald-500',
    shadow: 'shadow-emerald-500/30',
  },
  red: {
    primary: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    primaryLight: 'bg-red-500/20',
    secondary: 'bg-rose-600',
    secondaryHover: 'hover:bg-rose-700',
    accent: 'text-red-400',
    accentHover: 'hover:text-red-400',
    gradient: 'from-red-600 to-rose-600',
    gradientText: 'from-red-400 via-rose-400 to-orange-400',
    background: 'bg-white',
    surface: 'bg-slate-50',
    text: 'text-slate-900',
    textSecondary: 'text-slate-600',
    border: 'border-red-500',
    shadow: 'shadow-red-500/30',
  },
  dark: {
    primary: 'bg-slate-700',
    primaryHover: 'hover:bg-slate-800',
    primaryLight: 'bg-slate-600/20',
    secondary: 'bg-slate-600',
    secondaryHover: 'hover:bg-slate-700',
    accent: 'text-slate-300',
    accentHover: 'hover:text-slate-200',
    gradient: 'from-slate-700 to-slate-600',
    gradientText: 'from-slate-300 via-slate-200 to-slate-100',
    background: 'bg-slate-950',
    surface: 'bg-slate-900',
    text: 'text-white',
    textSecondary: 'text-slate-300',
    border: 'border-slate-600',
    shadow: 'shadow-slate-500/30',
  },
  light: {
    primary: 'bg-slate-200',
    primaryHover: 'hover:bg-slate-300',
    primaryLight: 'bg-slate-100/50',
    secondary: 'bg-slate-300',
    secondaryHover: 'hover:bg-slate-400',
    accent: 'text-slate-700',
    accentHover: 'hover:text-slate-800',
    gradient: 'from-slate-200 to-slate-300',
    gradientText: 'from-slate-700 via-slate-600 to-slate-500',
    background: 'bg-slate-50',
    surface: 'bg-white',
    text: 'text-slate-900',
    textSecondary: 'text-slate-700',
    border: 'border-slate-300',
    shadow: 'shadow-slate-500/20',
  },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('jetfyx-theme');
    return (saved as ThemeType) || 'red';
  });

  useEffect(() => {
    localStorage.setItem('jetfyx-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

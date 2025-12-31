import { Palette } from 'lucide-react';
import { useTheme, ThemeType } from '../contexts/ThemeContext';
import { useState } from 'react';

const themeOptions: { value: ThemeType; label: string; color: string }[] = [
  { value: 'blue', label: 'Blue', color: 'bg-primary' },
  { value: 'green', label: 'Green', color: 'bg-emerald-600' },
  { value: 'red', label: 'Red', color: 'bg-red-600' },
  { value: 'dark', label: 'Dark', color: 'bg-slate-800' },
  { value: 'light', label: 'Light', color: 'bg-slate-300' },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-2 border-slate-200"
          aria-label="Theme Switcher"
        >
          <Palette className="w-6 h-6" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-slate-200 p-4 min-w-[200px]">
            <h3 className="text-sm font-bold text-slate-900 mb-3 px-2">Choose Theme</h3>
            <div className="space-y-2">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    theme === option.value
                      ? 'bg-slate-100 shadow-sm'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg ${option.color} shadow-md`} />
                  <span className="text-sm font-medium text-slate-900">{option.label}</span>
                  {theme === option.value && (
                    <svg
                      className="w-4 h-4 ml-auto text-slate-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-border bg-gradient-to-r from-[#FFA301] to-[#FF8C00] sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3F1470] to-[#5A1F9B] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">PN</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Perceive Now
              </h1>
              <p className="text-sm text-white/90">
                Report Viewer
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

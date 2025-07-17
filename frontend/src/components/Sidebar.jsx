import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import {
    Home,
    Users,
    FileText,
    Settings,
    ChevronDown,
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Moon,
    Sun
} from 'lucide-react';

const Sidebar = () => {
    const [isAiAgentsExpanded, setIsAiAgentsExpanded] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`w-64 h-screen overflow-y-hidden flex flex-col transition-all duration-300 ${
            theme === 'dark' 
                ? 'bg-gradient-to-b from-[#3F1470] to-[#2A0E4F] text-white' 
                : 'bg-gradient-to-b from-[#FFA301] to-[#FF8C00] text-black'
        }`}>
            {/* Header */}
            <div className={`p-6 border-b transition-colors duration-300 ${
                theme === 'dark' ? 'border-purple-600/30' : 'border-white/20'
            }`}>
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-2">
                     <img src="https://app.perceivenow.ai/static/media/logo.9e4f8d983654c596a019d99965c9c4ab.svg" alt="" />
                    </div>
                </div>

                <Button
                    className={`w-full text-md text-white rounded-xl py-4 transition-colors duration-300 ${
                        theme === 'dark' 
                            ? 'bg-[#FFA301] hover:bg-[#FF8C00]' 
                            : 'bg-[#3F1470] hover:bg-[#5A1F9B]'
                    }`}
                    size="lg"
                >
                    {/* <Plus className="w-4 h-4 mr-2" /> */}
                    Start New Report
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {/* Home */}
                <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                    theme === 'dark' 
                        ? 'hover:bg-white/10 text-white' 
                        : 'hover:bg-white/10 text-black'
                }`}>
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                </div>

                {/* AI Agents */}
                <div>
                    <div
                        className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                            theme === 'dark' 
                                ? 'hover:bg-white/10 text-white' 
                                : 'hover:bg-white/10 text-black'
                        }`}
                        onClick={() => setIsAiAgentsExpanded(!isAiAgentsExpanded)}
                    >
                        <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5" />
                            <span className="font-medium">AI Agents</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isAiAgentsExpanded ? 'rotate-180' : ''}`} />
                    </div>
                    {isAiAgentsExpanded && (
                        <div className="ml-8 mt-2 space-y-1">
                            <div className={`px-3 py-1 text-sm cursor-pointer transition-colors duration-300 ${
                                theme === 'dark' 
                                    ? 'text-white/80 hover:text-white' 
                                    : 'text-black/80 hover:text-black'
                            }`}>
                                Agent 1
                            </div>
                            <div className={`px-3 py-1 text-sm cursor-pointer transition-colors duration-300 ${
                                theme === 'dark' 
                                    ? 'text-white/80 hover:text-white' 
                                    : 'text-black/80 hover:text-black'
                            }`}>
                                Agent 2
                            </div>
                        </div>
                    )}
                </div>

                {/* Deal Flow Screening - Active */}
                <div className={`border-l-4 px-3 py-2 rounded-lg transition-colors duration-300 ${
                    theme === 'dark' 
                        ? 'bg-white/20 border-white text-white' 
                        : 'bg-white/20 border-white text-black'
                }`}>
                    <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5" />
                        <span className="font-medium">Deal Flow Screening</span>
                    </div>
                </div>

                {/* Scope of Work Drafts */}
                <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                    theme === 'dark' 
                        ? 'hover:bg-white/10 text-white' 
                        : 'hover:bg-white/10 text-black'
                }`}>
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Scope of Work Drafts</span>
                </div>

                {/* Sub-items */}
                <div className="ml-6 space-y-1">
                    <div className={`px-3 py-1 text-sm cursor-pointer transition-colors duration-300 ${
                        theme === 'dark' 
                            ? 'text-white/80 hover:text-white' 
                            : 'text-black/80 hover:text-black'
                    }`}>
                        Untitled-Compan...
                    </div>
                    <div className={`px-3 py-1 text-sm cursor-pointer transition-colors duration-300 ${
                        theme === 'dark' 
                            ? 'text-white/80 hover:text-white' 
                            : 'text-black/80 hover:text-black'
                    }`}>
                        Untitled-Compan...
                    </div>
                    <div className={`px-3 py-1 text-sm cursor-pointer transition-colors duration-300 ${
                        theme === 'dark' 
                            ? 'text-white/80 hover:text-white' 
                            : 'text-black/80 hover:text-black'
                    }`}>
                        Untitled-Portfo...
                    </div>
                </div>
            </nav>

            {/* Footer */}
            <div className={`p-4 border-t transition-colors duration-300 ${
                theme === 'dark' ? 'border-purple-600/30' : 'border-white/20'
            }`}>
                {/* Theme Toggle */}
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-2 bg-white/10 rounded-full p-2">
                        <Sun className={`w-4 h-4 transition-all duration-300 ${
                            theme === 'light' 
                                ? 'text-yellow-500 scale-110' 
                                : theme === 'dark' 
                                    ? 'text-[#FFA301]' 
                                    : 'text-black/40'
                        }`} />
                        <Switch
                            checked={theme === 'dark'}
                            onCheckedChange={toggleTheme}
                            className="mx-2 data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-yellow-400"
                        />
                        <Moon className={`w-4 h-4 transition-all duration-300 ${
                            theme === 'dark' 
                                ? 'text-purple-400 scale-110' 
                                : 'text-black/40'
                        }`} />
                    </div>
                </div>
                
                <div className={`flex items-center justify-between text-sm transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-black/80'
                }`}>
                    <span>Help</span>
                    <span>Feedback</span>
                </div>
                <div className={`flex items-center justify-between text-xs mt-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-black/60'
                }`}>
                    <span>© 2025</span>
                    <span>Privacy Statement</span>
                    <span>Terms of use</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

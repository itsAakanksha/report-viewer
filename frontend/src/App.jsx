import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import FilterBar from '@/components/FilterBar';
import ReportsList from '@/components/ReportsList';
import DeepDivePanel from '@/components/DeepDivePanel';
import Sidebar from '@/components/Sidebar';
import './App.css';

function App() {
  const [filters, setFilters] = useState({
    search: '',
    reportType: 'all',
    industry: 'all',
    confidenceScore: 'all'
  });

  const [selectedReport, setSelectedReport] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedReport(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Mobile Sidebar Overlay */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
        
        {/* Desktop Sidebar - Left Side */}
        {!isMobile && (
          <Sidebar 
            isOpen={true}
            onClose={closeSidebar}
            isMobile={false}
          />
        )}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <FilterBar 
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
            onToggleSidebar={toggleSidebar}
            isMobile={isMobile}
          />
          
          <main className="flex-1 overflow-y-auto pb-8">
            <ReportsList 
              filters={filters} 
              onReportClick={handleReportClick}
            />
          </main>
        </div>
        
        {/* Mobile Sidebar - Right Side */}
        {isMobile && (
          <Sidebar 
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
            isMobile={isMobile}
          />
        )}
        
        <DeepDivePanel 
          report={selectedReport}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          isMobile={isMobile}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

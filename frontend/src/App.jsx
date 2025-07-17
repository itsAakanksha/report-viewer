import { useState } from 'react';
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

  return (
    <ThemeProvider>
      <div className="flex  h-screen overflow-y-hidden bg-background">
        {/* Static Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-scroll">
          <FilterBar 
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
          />
          
          <main className="pb-8">
            <ReportsList 
              filters={filters} 
              onReportClick={handleReportClick}
            />
          </main>
        </div>
        
        <DeepDivePanel 
          report={selectedReport}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

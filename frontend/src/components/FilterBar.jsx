import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, ChevronDown, SlidersHorizontal, Menu } from 'lucide-react';
import { api } from '@/services';

const FilterBar = ({ onFiltersChange, activeFilters, onToggleSidebar, isMobile }) => {
  const [filterOptions, setFilterOptions] = useState({
    reportTypes: [],
    industries: [],
    confidenceRanges: []
  });
  const [searchTerm, setSearchTerm] = useState(activeFilters.search || '');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await api.getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Failed to load filter options:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    onFiltersChange(newFilters);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleFilterChange('search', value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value && value !== 'all' && value !== ''
    ).length;
  };

  const getFilterLabel = (key, value) => {
    if (key === 'reportType') return `Type: ${value}`;
    if (key === 'industry') return `Industry: ${value}`;
    if (key === 'confidenceScore') return `Confidence: ${value}`;
    if (key === 'search') return `Search: ${value}`;
    return value;
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-[#3F1470]/5 to-[#5A1F9B]/5 dark:from-[#FFA301]/5 dark:to-[#FF8C00]/5 border-b border-border/50 p-4 md:px-12 md:py-8">
        <div className="container mx-auto">
          <div className="flex items-center space-x-4">
            <div className="h-11 w-80 bg-gradient-to-r from-muted to-muted/80 animate-pulse rounded-xl shadow-sm"></div>
            <div className="h-11 w-36 bg-gradient-to-r from-muted to-muted/80 animate-pulse rounded-xl shadow-sm"></div>
            <div className="h-11 w-36 bg-gradient-to-r from-muted to-muted/80 animate-pulse rounded-xl shadow-sm"></div>
            <div className="h-11 w-36 bg-gradient-to-r from-muted to-muted/80 animate-pulse rounded-xl shadow-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border/50 backdrop-blur-sm p-4 md:px-12 md:py-8">
      <div className="container mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00] shadow-lg">
              <SlidersHorizontal className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#3F1470] dark:text-[#FFA301]">
                Filter & Search
              </h2>
              <p className="text-sm text-muted-foreground hidden sm:block">Find the perfect reports for your needs</p>
            </div>
            
            {/* Mobile Menu Button - Right Side */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleSidebar}
                className="p-2 h-10 w-10 ml-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="relative w-full lg:flex-1 lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports, keywords..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-11 h-11 bg-background/80 backdrop-blur-sm border-border/50 focus:border-[#3F1470] dark:focus:border-[#FFA301] focus:ring-2 focus:ring-[#3F1470]/20 dark:focus:ring-[#FFA301]/20 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
              />
            </div>
            
            <div className="flex items-center space-x-3 flex-wrap w-full lg:w-auto">
              <Select
                value={activeFilters.reportType || 'all'}
                onValueChange={(value) => handleFilterChange('reportType', value)}
              >
                <SelectTrigger className="h-11 min-w-[120px] flex-1 sm:flex-none bg-background/80 backdrop-blur-sm border-border/50 focus:border-[#3F1470] dark:focus:border-[#FFA301] focus:ring-2 focus:ring-[#3F1470]/20 dark:focus:ring-[#FFA301]/20 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
                  <SelectItem value="all" className="hover:bg-[#3F1470]/10 dark:hover:bg-[#FFA301]/10 rounded-lg">All Types</SelectItem>
                  {filterOptions.reportTypes.map(type => (
                    <SelectItem key={type} value={type} className="hover:bg-[#3F1470]/10 dark:hover:bg-[#FFA301]/10 rounded-lg">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={activeFilters.industry || 'all'}
                onValueChange={(value) => handleFilterChange('industry', value)}
              >
                <SelectTrigger className="h-11 min-w-[120px] flex-1 sm:flex-none bg-background/80 backdrop-blur-sm border-border/50 focus:border-[#3F1470] dark:focus:border-[#FFA301] focus:ring-2 focus:ring-[#3F1470]/20 dark:focus:ring-[#FFA301]/20 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
                  <SelectItem value="all" className="hover:bg-[#3F1470]/10 dark:hover:bg-[#FFA301]/10 rounded-lg">All Industries</SelectItem>
                  {filterOptions.industries.map(industry => (
                    <SelectItem key={industry} value={industry} className="hover:bg-[#3F1470]/10 dark:hover:bg-[#FFA301]/10 rounded-lg">{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={activeFilters.confidenceScore || 'all'}
                onValueChange={(value) => handleFilterChange('confidenceScore', value)}
              >
                <SelectTrigger className="h-11 min-w-[120px] flex-1 sm:flex-none bg-background/80 backdrop-blur-sm border-border/50 focus:border-[#3F1470] dark:focus:border-[#FFA301] focus:ring-2 focus:ring-[#3F1470]/20 dark:focus:ring-[#FFA301]/20 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
                  <SelectValue placeholder="Confidence" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm border-border/50 rounded-xl shadow-2xl">
                  {filterOptions.confidenceRanges.map(range => (
                    <SelectItem key={range.value} value={range.value} className="hover:bg-[#3F1470]/10 dark:hover:bg-[#FFA301]/10 rounded-lg">
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {getActiveFilterCount() > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="whitespace-nowrap h-11 px-4 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear ({getActiveFilterCount()})
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {getActiveFilterCount() > 0 && (
            <div className="flex items-center space-x-3 flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Active filters:</span>
              </div>
              <div className="flex items-center space-x-2 flex-wrap">
                {Object.entries(activeFilters).map(([key, value]) => {
                  if (!value || value === 'all' || value === '') return null;
                  return (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="cursor-pointer bg-gradient-to-r from-[#3F1470]/10 to-[#5A1F9B]/10 dark:from-[#FFA301]/10 dark:to-[#FF8C00]/10 text-[#3F1470]  border-[#3F1470]/20 dark:border-[#FFA301]/20 hover:from-destructive hover:to-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-200 rounded-lg px-3 py-1 font-medium shadow-sm hover:shadow-md"
                      onClick={() => handleFilterChange(key, key === 'search' ? '' : 'all')}
                    >
                      {getFilterLabel(key, value)}
                      <X className="h-3 w-3 ml-2 opacity-60 hover:opacity-100 transition-opacity" />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

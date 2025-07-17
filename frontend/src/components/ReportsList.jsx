import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw, Calendar, User, TrendingUp } from 'lucide-react';
import { api } from '@/services';

const ReportsList = ({ filters, onReportClick }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalReports, setTotalReports] = useState(0);

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await api.getReports(filters);
        setReports(response.reports);
        setTotalReports(response.total);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load reports:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, [filters]);

  const handleRetry = () => {
    setError(null);
    const loadReports = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await api.getReports(filters);
        setReports(response.reports);
        setTotalReports(response.total);
      } catch (err) {
        setError(err.message);
        console.error('Failed to load reports:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadReports();
  };

  const getConfidenceColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceLabel = (score) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-12 py-6 md:py-8">
        {/* Desktop Loading */}
        <div className="hidden md:block bg-white dark:bg-card rounded-lg border border-border overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00] text-white">
                <tr>
                  <th className="text-left p-4 md:p-6 font-semibold">Report Title</th>
                  <th className="text-left p-4 md:p-6 font-semibold">Type</th>
                  <th className="text-left p-4 md:p-6 font-semibold">Industry</th>
                  <th className="text-left p-4 md:p-6 font-semibold">Confidence</th>
                  <th className="text-left p-4 md:p-6 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-4 md:p-6"><Skeleton className="h-4 w-48" /></td>
                    <td className="p-4 md:p-6"><Skeleton className="h-4 w-20" /></td>
                    <td className="p-4 md:p-6"><Skeleton className="h-4 w-24" /></td>
                    <td className="p-4 md:p-6"><Skeleton className="h-4 w-16" /></td>
                    <td className="p-4 md:p-6"><Skeleton className="h-4 w-32" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Loading */}
        <div className="md:hidden space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-card rounded-lg border border-border p-4 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load reports</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={handleRetry} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No reports found</h2>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms to find more reports.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-6 md:py-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-semibold">
          Reports ({totalReports})
        </h2>
        <div className="text-xs md:text-sm text-muted-foreground">
          Showing {reports.length} of {totalReports}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-card rounded-lg border border-border overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00] text-white">
              <tr>
                <th className="text-left p-4 md:p-6 font-semibold">Report Title</th>
                <th className="text-left p-4 md:p-6 font-semibold">Type</th>
                <th className="text-left p-4 md:p-6 font-semibold">Industry</th>
                <th className="text-left p-4 md:p-6 font-semibold">Confidence</th>
                <th className="text-left p-4 md:p-6 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {reports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    className="border-b border-border/50 hover:bg-gradient-to-r hover:from-[#FFA301]/5 hover:to-[#FF8C00]/5 cursor-pointer transition-all duration-200 hover:shadow-md"
                    onClick={() => onReportClick(report)}
                  >
                    <td className="p-4 md:p-6">
                      <div className="max-w-md">
                        <h3 className="font-medium text-foreground line-clamp-2 mb-1">
                          {report.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {report.summary}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <Badge variant="outline" className="text-xs">
                        {report.reportType}
                      </Badge>
                    </td>
                    <td className="p-4 md:p-6">
                      <Badge variant="secondary" className="text-xs">
                        {report.industry}
                      </Badge>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getConfidenceColor(report.confidenceScore)}`} />
                        <span className="font-medium">{report.confidenceScore}%</span>
                        <span className="text-xs text-muted-foreground">
                          {getConfidenceLabel(report.confidenceScore)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 md:p-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(report.date)}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        <AnimatePresence mode="wait">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              className="bg-white dark:bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => onReportClick(report)}
            >
              <div className="space-y-3">
                {/* Header with badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground line-clamp-2 text-sm leading-tight">
                      {report.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getConfidenceColor(report.confidenceScore)}`} />
                    <span className="text-xs font-medium">{report.confidenceScore}%</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {report.summary}
                </p>

                {/* Badges and meta info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs py-0.5 px-2">
                      {report.reportType}
                    </Badge>
                    <Badge variant="secondary" className="text-xs py-0.5 px-2">
                      {report.industry}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(report.date)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReportsList;
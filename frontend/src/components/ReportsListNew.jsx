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
      <div className="container mx-auto px-4 py-6">
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium">Report Title</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Industry</th>
                  <th className="text-left p-4 font-medium">Confidence</th>
                  <th className="text-left p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-4"><Skeleton className="h-4 w-48" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="p-4"><Skeleton className="h-4 w-20" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Reports ({totalReports})
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-lg border border-border overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium">Report Title</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Industry</th>
                <th className="text-left p-4 font-medium">Confidence</th>
                <th className="text-left p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {reports.map((report, index) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onReportClick(report)}
                  >
                    <td className="p-4">
                      <div className="space-y-1">
                        <h3 className="font-medium text-foreground line-clamp-1">
                          {report.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {report.summary}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {report.reportType}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {report.industry}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getConfidenceColor(report.confidenceScore)}`} />
                          <span className="text-sm font-medium">
                            {report.confidenceScore}%
                          </span>
                        </div>
                        <Badge 
                          variant={report.confidenceScore >= 80 ? "default" : report.confidenceScore >= 60 ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {getConfidenceLabel(report.confidenceScore)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(report.date)}
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reports found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReportsList;

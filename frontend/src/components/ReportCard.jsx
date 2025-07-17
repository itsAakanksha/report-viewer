import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Calendar, 
  User, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Lightbulb,
  Target,
  ChevronRight
} from 'lucide-react';

const ReportCard = ({ report, onClick }) => {
  const getReportIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'financial':
        return <TrendingUp className="h-5 w-5" />;
      case 'risk':
        return <Shield className="h-5 w-5" />;
      case 'analytics':
        return <BarChart3 className="h-5 w-5" />;
      case 'strategic':
        return <Target className="h-5 w-5" />;
      case 'security':
        return <Shield className="h-5 w-5" />;
      case 'innovation':
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getConfidenceColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getConfidenceLabel = (score) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {getReportIcon(report.reportType)}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                {report.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {report.reportType}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {report.industry}
                </Badge>
              </div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {report.summary}
        </p>
        
        {/* Confidence Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Confidence Score
            </span>
            <span className={`text-sm font-semibold ${getConfidenceColor(report.confidenceScore)}`}>
              {report.confidenceScore}% ({getConfidenceLabel(report.confidenceScore)})
            </span>
          </div>
          <Progress 
            value={report.confidenceScore} 
            className="h-2"
          />
        </div>
        
        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(report.date).toLocaleDateString()}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick(report);
            }}
            className="text-xs h-6 px-2 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View Details
          </Button>
        </div>
        
        {/* Tags */}
        {report.tags && report.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {report.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-2 py-0.5"
              >
                {tag}
              </Badge>
            ))}
            {report.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{report.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard;

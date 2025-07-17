import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, TrendingUp, MessageSquare, Send, ChevronDown, ChevronUp, ExternalLink, Flag, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toast } from '@/components/ui/toast';
import FeedbackForm from '@/components/FeedbackForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { api } from '@/services';

const ConfidenceMeter = ({ score, className = "" }) => {
  const getColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLabel = (score) => {
    if (score >= 80) return 'High Confidence';
    if (score >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Confidence Score</h3>
        <span className={`text-2xl font-bold ${getColor(score)}`}>
          {score}%
        </span>
      </div>
      
      <div className="space-y-2">
        <Progress value={score} className="h-3" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span className={getColor(score)}>
            {getLabel(score)}
          </span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

const SourceCard = ({ source, isExpanded, onToggle }) => {
  const getReliabilityColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-l-4 border-l-primary/20 hover:border-l-primary/40 transition-all duration-200 hover:shadow-md bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getReliabilityColor(source.reliability)} shadow-sm`} />
              <span className="font-medium text-sm">{source.reliability}%</span>
            </div>
            <Badge variant="outline" className="text-xs bg-muted/30">
              {source.type}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors duration-200"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <div>
          <h4 className="font-medium text-sm text-[#3F1470] dark:text-[#FFA301]">{source.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date(source.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CardContent className="pt-0">
              <div className="bg-muted/20 rounded-lg p-3 mb-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {source.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs hover:bg-[#3F1470]/10 dark:hover:bg-[#FFA301]/10">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Source
                </Button>
                <span className="text-xs text-muted-foreground">
                  Reliability: {source.reliability}%
                </span>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};



const DeepDivePanel = ({ report, isOpen, onClose }) => {
  const [expandedSources, setExpandedSources] = useState({});
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleSource = (sourceId) => {
    setExpandedSources(prev => ({
      ...prev,
      [sourceId]: !prev[sourceId]
    }));
  };

  const handleFeedbackSubmit = () => {
    setFeedbackDialogOpen(false); // Close the dialog
    setShowToast(true); // Show toast notification
  };

  if (!report) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300,
              duration: 0.5,
              ease: "easeOut"
            }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-gradient-to-br from-background to-background/95 backdrop-blur-sm border-l border-border/50 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="p-6 border-b border-border/50 bg-gradient-to-r from-[#3F1470]/5 to-[#5A1F9B]/5 dark:from-[#FFA301]/5 dark:to-[#FF8C00]/5 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <Badge variant="outline" className="bg-[#3F1470]/10 dark:bg-[#FFA301]/10 border-[#3F1470]/30 dark:border-[#FFA301]/30">
                      {report.reportType}
                    </Badge>
                    <Badge variant="secondary" className="bg-muted/50">
                      {report.industry}
                    </Badge>
                  </motion.div>
                  <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-xl font-semibold line-clamp-2 bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00] bg-clip-text text-transparent"
                  >
                    {report.title}
                  </motion.h1>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-sm text-muted-foreground mt-2 flex items-center gap-2"
                  >
                    <span>By {report.author}</span>
                    <span>•</span>
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </motion.p>
                </div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="shrink-0 hover:bg-destructive/10 hover:text-destructive transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-muted/80">
              <div className="p-6 space-y-6">
                {/* Summary */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="  rounded-t-lg">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00]">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[#3F1470] dark:text-[#FFA301]">Report Summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {report.summary}
                      </p>
                      {report.details && (
                        <div className="mt-6 space-y-4">
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h4 className="font-medium mb-3 text-sm text-[#3F1470] dark:text-[#FFA301]">Key Findings:</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {report.details.keyFindings.map((finding, index) => (
                                <motion.li 
                                  key={index} 
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00] mt-2 flex-shrink-0" />
                                  <span className="leading-relaxed">{finding}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/20 rounded-lg p-3">
                              <span className="font-medium text-sm text-[#3F1470] dark:text-[#FFA301]">Methodology:</span>
                              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                                {report.details.methodology}
                              </p>
                            </div>
                            <div className="bg-muted/20 rounded-lg p-3">
                              <span className="font-medium text-sm text-[#3F1470] dark:text-[#FFA301]">Data Points:</span>
                              <p className="text-muted-foreground mt-1 text-xs">
                                {report.details.dataPoints.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Confidence Meter */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="rounded-t-lg">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00]">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[#3F1470] dark:text-[#FFA301]">Confidence Assessment</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ConfidenceMeter score={report.confidenceScore} />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Why We Trust This - Sources */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="rounded-t-lg">
                      <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00]">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[#3F1470] dark:text-[#FFA301]">Why We Trust This</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                          This report's confidence score is based on the reliability and quality of the following sources:
                        </p>
                        <div className="space-y-3">
                          {report.sources.map((source, index) => (
                            <motion.div
                              key={source.id}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                            >
                              <SourceCard
                                source={source}
                                isExpanded={expandedSources[source.id]}
                                onToggle={() => toggleSource(source.id)}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Fixed Feedback Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="p-6 border-t border-border/50 bg-gradient-to-r from-[#3F1470]/5 to-[#5A1F9B]/5 dark:from-[#FFA301]/5 dark:to-[#FF8C00]/5 backdrop-blur-sm"
            >
              <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-[#3F1470] to-[#5A1F9B] dark:from-[#FFA301] dark:to-[#FF8C00] hover:from-[#3F1470]/90 hover:to-[#5A1F9B]/90 dark:hover:from-[#FFA301]/90 dark:hover:to-[#FF8C00]/90 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Provide Feedback
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-[#3F1470] dark:text-[#FFA301]">
                      Share Your Feedback
                    </DialogTitle>
                  </DialogHeader>
                  <FeedbackForm
                    reportId={report.id}
                    onSubmit={handleFeedbackSubmit}
                  />
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>
          
          {/* Toast Notification */}
          <Toast
            variant="success"
            title="Feedback Submitted!"
            description="Thank you for your feedback. It helps us improve our reports."
            isVisible={showToast}
            onClose={() => setShowToast(false)}
            duration={3000}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default DeepDivePanel;

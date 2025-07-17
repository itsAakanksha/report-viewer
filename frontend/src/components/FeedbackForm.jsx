import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Toast } from '@/components/ui/toast';
import { Send } from 'lucide-react';
import { api } from '@/services';

const FeedbackForm = ({ reportId, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [severity, setSeverity] = useState('low');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const feedbackTypes = [
    { value: 'general', label: 'General Feedback', icon: '💬' },
    { value: 'improvement', label: 'Suggested Improvement', icon: '💡' },
    { value: 'error', label: 'Flag Error/Issue', icon: '🚩' },
    { value: 'data', label: 'Data Quality Issue', icon: '📊' }
  ];

  const severityLevels = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    setShowErrorToast(false); // Hide any previous error toast
    
    try {
      await api.submitFeedback(reportId, { 
        feedback,
        type: feedbackType,
        severity: feedbackType === 'error' ? severity : undefined,
      });
      onSubmit(); // This will trigger the success toast in parent component
      setFeedback('');
      setFeedbackType('general');
      setSeverity('low');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      
      // Show the actual error message from the API or a simple fallback
      const errorMsg = error.response?.data?.message || error.message || 'Failed to submit feedback.';
      
      setErrorMessage(errorMsg);
      setShowErrorToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
      {/* Feedback Type Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">
          What type of feedback would you like to provide?
        </label>
        <div className="grid grid-cols-2 gap-2">
          {feedbackTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFeedbackType(type.value)}
              className={`p-3 rounded-lg border text-left transition-all ${
                feedbackType === type.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Severity Level (only for errors) */}
      {feedbackType === 'error' && (
        <div>
          <label className="block text-sm font-medium mb-2">
            How critical is this issue?
          </label>
          <div className="flex gap-2">
            {severityLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setSeverity(level.value)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  severity === level.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className={level.color}>●</span> {level.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Text */}
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium mb-2">
          {feedbackType === 'error' ? 'Describe the error or issue' :
           feedbackType === 'improvement' ? 'What would you like to see improved?' :
           'Share your thoughts'}
        </label>
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={
            feedbackType === 'error' ? 'Please describe the error you found, where it appears, and any impact it has...' :
            feedbackType === 'improvement' ? 'What specific improvements would enhance this report?' :
            'Share your feedback, suggestions, or general comments about this report...'
          }
          rows={4}
          className="resize-none"
          required
        />
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground">
            {feedbackType === 'error' && 'Please be as specific as possible to help us fix the issue quickly.'}
            {feedbackType === 'improvement' && 'Your suggestions help us improve our reports.'}
            {feedbackType === 'general' && 'All feedback is valuable to us.'}
          </p>
          <span className="text-xs text-muted-foreground">
            {feedback.length}/500
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-2">
        <Button 
          type="submit" 
          disabled={!feedback.trim() || isSubmitting || feedback.length > 500}
          className="flex-1"
          variant={feedbackType === 'error' ? 'destructive' : 'default'}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Submitting...
            </div>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              {feedbackType === 'error' ? 'Report Issue' : 'Submit Feedback'}
            </>
          )}
        </Button>
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-muted-foreground">
        Your feedback helps us improve. We may contact you for clarification if needed.
      </p>
    </form>

    {/* Error Toast */}
    <Toast
      variant="error"
      title="Submission Failed"
      description={errorMessage}
      isVisible={showErrorToast}
      onClose={() => setShowErrorToast(false)}
      duration={5000}
    />
  </>
  );
};

export default FeedbackForm;
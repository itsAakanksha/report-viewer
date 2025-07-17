import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from './button';

const Toast = ({ 
  variant = 'default', 
  title, 
  description, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          text: 'text-green-800 dark:text-green-200',
          icon: Check,
          iconColor: 'text-green-600 dark:text-green-400'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          text: 'text-red-800 dark:text-red-200',
          icon: AlertCircle,
          iconColor: 'text-red-600 dark:text-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          text: 'text-yellow-800 dark:text-yellow-200',
          icon: AlertTriangle,
          iconColor: 'text-yellow-600 dark:text-yellow-400'
        };
      default:
        return {
          bg: 'bg-background',
          border: 'border-border',
          text: 'text-foreground',
          icon: Info,
          iconColor: 'text-muted-foreground'
        };
    }
  };

  const styles = getVariantStyles(variant);
  const IconComponent = styles.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-4 right-4 z-[100] w-full max-w-sm ${styles.bg} ${styles.border} border rounded-lg shadow-lg p-4 backdrop-blur-sm`}
        >
          <div className="flex items-start gap-3">
            <IconComponent className={`h-5 w-5 ${styles.iconColor} mt-0.5 flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className={`font-medium text-sm ${styles.text} mb-1`}>
                  {title}
                </h4>
              )}
              {description && (
                <p className={`text-sm ${styles.text} opacity-90`}>
                  {description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={`h-6 w-6 p-0 hover:bg-black/5 dark:hover:bg-white/5 ${styles.text}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Toast };

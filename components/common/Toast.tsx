import React, { useEffect } from 'react';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { type ToastProps } from '@/lib/types';

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 5000,
  link,
  show 
}) => {
  useEffect(() => {
    if (show && duration > 0) { 
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]); 

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600 text-white';
      case 'info':
        return 'bg-blue-600 text-white'; 
      case 'warning':
        return 'bg-yellow-500 text-gray-900'; 
      case 'error':
        return 'bg-red-600 text-white'; 
      default:
        return 'bg-gray-800 text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };


  if (!show) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-xl flex items-center space-x-3 transition-all duration-300 transform animate-slideInFromRight
        ${getColors()}
      `}
      role="alert"
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-grow">
        <p className="font-medium text-sm">{message}</p>
        {link && (
          <a
            href={link.href}
            target={link.target || '_self'}
            rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
            className={`underline hover:no-underline text-xs mt-1 block
              ${type === 'warning' ? 'text-blue-800' : 'text-blue-200'}
            `}
            onClick={onClose}
          >
            {link.text}
          </a>
        )}
      </div>
      <button
        onClick={onClose}
        className="ml-auto p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close Toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return <div className={`error-message ${className}`}>{message}</div>;
};

export default ErrorMessage;

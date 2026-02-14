import React from 'react';
import { cn } from '../../utils/utility';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'navy' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-[#FF9933] text-white hover:bg-[#e68a00] focus:ring-[#FF9933] dark:bg-[#FF9933] dark:hover:bg-[#e68a00]", // Saffron
    secondary: "bg-[#138808] text-white hover:bg-[#0f6b06] focus:ring-[#138808] dark:bg-[#138808]", // Green
    navy: "bg-[#000080] text-white hover:bg-[#000066] focus:ring-[#000080] dark:bg-blue-800 dark:hover:bg-blue-700", // Navy Blue
    outline: "border-2 border-[#000080] text-[#000080] hover:bg-[#000080] hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900",
    ghost: "text-[#000080] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

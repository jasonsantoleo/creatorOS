import React from 'react';
// import { useNavigate } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  icon: Icon,
  className = '' 
}) => {
  // const navigate=useNavigate()
  const baseStyles = "font-medium text-base px-6 py-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 w-full min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed font-inter";

  const variants = {
    primary: "bg-purple-500 text-white border-purple-500 hover:bg-purple-600 active:translate-y-0.5",
    secondary: "bg-white text-purple-500 border-purple-500 hover:bg-gray-50 active:translate-y-0.5"
  };
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;
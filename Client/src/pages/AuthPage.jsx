import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Button Component
const Button = ({ variant, onClick, icon: Icon, children }) => {
  const baseClasses = "w-full py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500",
    secondary: "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </button>
  );
};

// Google Icon Component
const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// Phone Icon Component
const PhoneIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
  </svg>
);

const AuthPage = () => {
  const navigate=useNavigate()
  // const handleGoogleSignUp = () => {
  //   console.log('Google sign-up clicked');
  // };

  const handlePhoneSignUp = () => {
    console.log('Phone sign-up clicked');
  };


  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-6 font-sans">
      {/* Dynamic container that adapts to screen size */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center space-y-6">
        {/* Logo - responsive sizing */}
        <div className="w-32 h-12 sm:w-36 sm:h-14 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-base sm:text-lg mb-4">
          CreatorOS
        </div>

        {/* Headline - responsive text sizing */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center leading-tight px-2">
          Join India's Independent Creators
        </h1>

        {/* Buttons - full width within container */}
        <div className="w-full space-y-4">
          <Button 
            variant="primary" 
            // onClick={handleGoogleSignUp}
            onClick={()=>{navigate('/home')}}
            icon={GoogleIcon}
          >
            Sign Up with Google
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={handlePhoneSignUp}
            icon={PhoneIcon}
          >
            Sign Up with Phone
          </Button>
        </div>

        {/* Footer Text - responsive sizing and spacing */}
        <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed mt-6 sm:mt-8 px-2">
          By signing up, you agree to our{' '}
          <a href="/terms" className="text-purple-500 underline hover:text-purple-600">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-purple-500 underline hover:text-purple-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
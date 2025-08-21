import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Check icon for available username
const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

// X icon for taken username
const XIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

// Loading spinner
const LoadingSpinner = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className="animate-spin">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="32" strokeDashoffset="32">
      <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
    </circle>
  </svg>
);

const OnboardingPage = () => {
    const navigate=useNavigate()
  const [username, setUsername] = useState('');
  const [checkStatus, setCheckStatus] = useState('idle'); // 'idle', 'checking', 'available', 'taken'
  const [isCompleting, setIsCompleting] = useState(false);

  // Debounce function
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedUsername = useDebounce(username, 500);

  // Check username availability
  useEffect(() => {
    const checkUsername = async (usernameToCheck) => {
      if (!usernameToCheck || usernameToCheck.length < 3) {
        setCheckStatus('idle');
        return;
      }

      setCheckStatus('checking');
      
      try {
        // Simulate API call - replace with actual endpoint
        // const response = await fetch(`/api/auth/check-username?username=${usernameToCheck}`);
        // const data = await response.json();
        
        // Mock logic for demo - replace with real API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        const mockTakenUsernames = ['john', 'jane', 'admin', 'test', 'creator'];
        const isTaken = mockTakenUsernames.includes(usernameToCheck.toLowerCase());
        
        setCheckStatus(isTaken ? 'taken' : 'available');
      } catch (error) {
        console.error('Error checking username:', error);
        setCheckStatus('idle');
      }
    };

    if (debouncedUsername) {
      checkUsername(debouncedUsername);
    }
  }, [debouncedUsername]);

  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setUsername(value);
  };

  const handleCompleteSetup = async () => {
    if (checkStatus !== 'available') return;
    
    setIsCompleting(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      // const response = await fetch('/api/auth/complete-onboarding', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username })
      // });
      
      // Mock success - replace with real API and redirect
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Setup completed, redirecting to dashboard...');
      // window.location.href = '/dashboard';
      navigate('/Dashboard')
    } catch (error) {
      console.error('Error completing setup:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const getHelperText = () => {
    switch (checkStatus) {
      case 'checking':
        return (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <LoadingSpinner />
            Checking availability...
          </div>
        );
      case 'available':
        return (
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckIcon />
            Available!
          </div>
        );
      case 'taken':
        return (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <XIcon />
            Sorry, that's taken
          </div>
        );
      default:
        return <div className="text-sm text-gray-400">Choose a username (3+ characters)</div>;
    }
  };

  const isButtonEnabled = checkStatus === 'available' && !isCompleting;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-inter">
      <div className="w-full max-w-sm flex flex-col items-center space-y-6">
        
        {/* Headline */}
        <h1 className="text-2xl font-bold text-gray-900 text-center leading-tight">
          One last step...
        </h1>

        {/* Description */}
        <p className="text-base text-gray-600 text-center leading-relaxed">
          Claim your unique CreatorOS address. This is the link you will share with your fans.
        </p>

        {/* Username Input */}
        <div className="w-full space-y-2">
          <div className="relative">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-purple-500 transition-colors">
              <span className="px-4 py-4 text-gray-500 text-base bg-gray-50 border-r border-gray-200">
                creatoros.com/
              </span>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="your-username"
                className="flex-1 px-4 py-4 text-base text-gray-900 bg-white outline-none placeholder-gray-400"
                maxLength="30"
              />
            </div>
          </div>
          
          {/* Helper Text */}
          <div className="px-1">
            {getHelperText()}
          </div>
        </div>

        {/* Complete Button */}
        <div className="w-full pt-4">
          <Button 
            variant="primary" 
            onClick={handleCompleteSetup}
            disabled={!isButtonEnabled}
          >
            {isCompleting ? 'Setting up...' : 'Complete Setup'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
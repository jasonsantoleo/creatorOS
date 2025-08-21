import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import {  useNavigate } from 'react-router-dom';

// Back Arrow Icon
const BackIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>
  </svg>
);

// Withdraw Icon
const WithdrawIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Warning Icon
const WarningIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

// Bank Icon
const BankIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.5 1L2 6v2h20V6m-5 4v7h3v-7M2 17v2h20v-2c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2M6 9v7h3V9m5 0v7h3V9H11Z"/>
  </svg>
);

// Transaction Item Component
const TransactionItem = ({ transaction }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatAmount = (amount) => {
    // Remove platform fee (5%) for display
    const netAmount = amount * 0.95;
    return netAmount.toFixed(2);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div>
        <div className="font-medium text-gray-900">{transaction.productName}</div>
        <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-green-600">+ ₹{formatAmount(transaction.amount)}</div>
        <div className="text-xs text-gray-400">Net amount</div>
      </div>
    </div>
  );
};

// Payout Status Component
const PayoutStatus = ({ payoutSetupComplete, bankDetails, onSetupClick }) => {
  if (payoutSetupComplete) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <BankIcon size={20} className="text-green-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-900">Payouts Enabled</h3>
            <p className="text-sm text-green-700 mt-1">
              Payouts are sent to {bankDetails?.accountNumber ? 
                `****${bankDetails.accountNumber.slice(-4)}` : 'your linked account'}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Withdrawals typically take 1-2 business days
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <WarningIcon size={20} className="text-orange-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-orange-900">Payouts Disabled</h3>
          <p className="text-sm text-orange-700 mt-1">
            Please connect your bank account to receive earnings.
          </p>
          <button
            onClick={onSetupClick}
            className="text-sm text-orange-600 font-medium mt-2 hover:text-orange-700 underline"
          >
            Setup Now
          </button>
        </div>
      </div>
    </div>
  );
};

const EarningsPage = () => {
  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const navigate=useNavigate()
  // Mock earnings data - replace with real API call
  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        // const response = await fetch('/api/earnings');
        // const data = await response.json();
        
        // Mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        setEarningsData({
          availableBalance: 1432.50,
          payoutSetupComplete: false, // Toggle this to see different states
          bankDetails: null,
          transactions: [
            {
              id: 1,
              productName: 'My Vegan Recipes',
              amount: 99,
              date: '2025-08-20T10:30:00Z',
              status: 'completed'
            },
            {
              id: 2,
              productName: '30-Min Coaching',
              amount: 1500,
              date: '2025-08-19T14:15:00Z',
              status: 'completed'
            },
            {
              id: 3,
              productName: 'Fitness Guide 2024',
              amount: 299,
              date: '2025-08-18T09:45:00Z',
              status: 'completed'
            },
            {
              id: 4,
              productName: 'Digital Art Bundle',
              amount: 799,
              date: '2025-08-17T16:20:00Z',
              status: 'completed'
            }
          ]
        });
      } catch (error) {
        console.error('Failed to fetch earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

//   const handleBack = () => {
//     console.log('Navigate back to dashboard');
//     // window.history.back() or navigate('/dashboard')
//   };

  const handleWithdraw = async () => {
    if (!earningsData?.payoutSetupComplete) return;
    
    setWithdrawing(true);
    
    try {
      // const response = await fetch('/api/payouts/initiate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     amount: earningsData.availableBalance
      //   })
      // });
      
      // Mock withdrawal process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Withdrawal initiated successfully');
      // Show success message and refresh data
      // You might want to show a success modal here
      
    } catch (error) {
      console.error('Withdrawal failed:', error);
      // Show error message
    } finally {
      setWithdrawing(false);
    }
  };

  const handleSetupPayout = () => {
    console.log('Navigate to bank account setup');
    // navigate('/settings/banking')
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-2" onClick={()=>{navigate('/dashboard')}}>
              <BackIcon size={20} className="text-gray-400" />
              <span className="text-gray-700">Back</span>
            </div>
            <p className=" font-semibold text-gray-900 rounded-lg border-black border-2 p-4">
              Earnings & Payouts
            </p>
            <div className="w-12"></div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your earnings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            /*onClick={handleBack}*/
            onClick={()=>{navigate('/dashboard')}}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <BackIcon size={20} />
            Back
          </button>
          <p className="text-xl font-semibold text-gray-900">
            Earnings & Payouts
          </p>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        
        {/* Available Balance Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">
                Available to Payout
              </h2>
              <div className="text-4xl font-bold text-gray-900">
                ₹{earningsData?.availableBalance?.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </div>
            </div>
            
            <Button
              variant="primary"
              onClick={handleWithdraw}
              disabled={!earningsData?.payoutSetupComplete || withdrawing}
              icon={WithdrawIcon}
            >
              {withdrawing ? 'Processing...' : 'Withdraw Earnings'}
            </Button>
          </div>
        </div>

        {/* Payout Status */}
        <PayoutStatus
          payoutSetupComplete={earningsData?.payoutSetupComplete}
          bankDetails={earningsData?.bankDetails}
          onSetupClick={handleSetupPayout}
        />

        {/* Transaction History */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Transaction History
            </h3>
          </div>
          
          <div className="px-6">
            {earningsData?.transactions?.length > 0 ? (
              earningsData.transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>No transactions yet</p>
                <p className="text-sm mt-1">Your sales will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
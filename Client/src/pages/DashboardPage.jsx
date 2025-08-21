import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Plus icon for create product button
const PlusIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

// Stats Card Component
const StatsCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      {Icon && <Icon className="text-gray-400" size={18} />}
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
  </div>
);

// Recent Sales Item Component
const SalesItem = ({ productName, amount, timeAgo }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div>
      <div className="font-medium text-gray-900">{productName}</div>
      <div className="text-sm text-gray-500">{timeAgo}</div>
    </div>
    <div className="font-semibold text-green-600">+ ₹{amount}</div>
  </div>
);

// Zero State Component - First time user
const ZeroState = ({ userName, /*onCreateProduct*/ }) => {
    const navigate=useNavigate()
    return(
  <div className="space-y-8">
    {/* Welcome Header */}
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome, {userName}!
      </h1>
      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
        {userName[0].toUpperCase()}
      </div>
    </div>

    {/* Main CTA Card */}
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-8 text-center">
      <div className="max-w-sm mx-auto space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Ready to make your first sale?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Let's create your first product. It only takes a few minutes to start.
        </p>
        <div className="pt-2">
          <Button 
            variant="primary" 
            // onClick={onCreateProduct}
            onClick={()=>{navigate('/product')}}
            icon={PlusIcon}
          >
            Create Your First Product
          </Button>
        </div>
      </div>
    </div>

    {/* AI Assistant Teaser */}
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="font-semibold text-gray-900">CreatorOS AI Assistant</h3>
          <p className="text-sm text-gray-600">Start selling to unlock intelligent suggestions.</p>
        </div>
      </div>
    </div>
  </div>)
};

// Active State Component - User with sales
const ActiveState = ({ userName, dashboardData, /*onCreateProduct*/ }) => {
    const navigate=useNavigate()
    return (
  <div className="space-y-6">
    {/* Welcome Header */}
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome, {userName}!
      </h1>
      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
        {userName[0].toUpperCase()}
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Today's Earnings"
        value={`₹${dashboardData.todayEarnings}`}
        subtitle="Great work today!"
      />
      <StatsCard
        title="Total Sales (30d)"
        value={dashboardData.totalSales}
        subtitle="products sold"
      />
      <StatsCard
        title="Available Payout"
        value={`₹${dashboardData.availablePayout.toLocaleString()}`}
        subtitle="Ready to withdraw"
      />
    </div>

    {/* Create New Product Button */}
    <Button 
      variant="primary" 
    //   onClick={onCreateProduct}
    onClick={()=>{navigate('/product')}}
      icon={PlusIcon}
    >
      Create New Product
    </Button>

    {/* Recent Sales */}
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
      </div>
      <div className="px-6">
        {dashboardData.recentSales.map((sale, index) => (
          <SalesItem
            key={index}
            productName={sale.productName}
            amount={sale.amount}
            timeAgo={sale.timeAgo}
          />
        ))}
      </div>
    </div>
  </div>
)};

const DashboardPage = () => {
  // Mock user data - replace with real user state/API calls
  const [userName] = useState('kavi vikash');
  const [hasActiveSales] = useState(true); // Toggle this to see different states
  
  // Mock dashboard data for active users
  const dashboardData = {
    todayEarnings: 599,
    totalSales: 42,
    availablePayout: 3450,
    recentSales: [
      { productName: 'My Vegan Recipes', amount: 99, timeAgo: '2 hours ago' },
      { productName: '30-Min Coaching', amount: 1500, timeAgo: '5 hours ago' },
      { productName: 'Fitness Guide 2024', amount: 299, timeAgo: '1 day ago' },
      { productName: 'Digital Art Bundle', amount: 799, timeAgo: '2 days ago' }
    ]
  };

  const handleCreateProduct = () => {
    // Navigate to product creation flow
    console.log('Navigate to product creation...');
    // window.location.href = '/create-product';
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-4xl mx-auto p-6">
        {hasActiveSales ? (
          <ActiveState 
            userName={userName}
            dashboardData={dashboardData}
            onCreateProduct={handleCreateProduct}
          />
        ) : (
          <ZeroState 
            userName={userName}
            onCreateProduct={handleCreateProduct}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
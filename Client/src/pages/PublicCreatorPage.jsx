import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/ui/Button';

// Social Media Icons
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Arrow Right Icon for CTA buttons
const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </svg>
);

// Product Card Component
const ProductCard = ({ product,/* creatorUsername ,*/  onBuyClick }) => {
  const handleBuyClick = () => {
    onBuyClick(product);
  };

  const getButtonText = () => {
    if (product.type === 'service') {
      return 'Book Now';
    }
    return 'Get It Now';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-purple-400 text-4xl">
            {product.type === 'service' ? '🎯' : '📚'}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </div>
          <button
            onClick={handleBuyClick}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1 hover:bg-purple-600 transition-colors"
          >
            {getButtonText()}
            <ArrowRightIcon size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Social Link Component
const SocialLink = ({ href, icon: Icon , platform }) => {
  console.log(Icon);
  
  return(
    
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-600 transition-colors"
    aria-label={`Visit ${platform}`}
  >
    <Icon size={20} />
  </a>
)};

const PublicCreatorPage = () => {
  const { username } = useParams();
  console.log(username);
  
  const [creatorData, setCreatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch creator data
  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        // const response = await fetch(`/api/creators/${username}/public`);
        // if (!response.ok) throw new Error('Creator not found');
        // const data = await response.json();
        
        // Mock creator data
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
        
        if (username === 'anika-creates') {
          setCreatorData({
            username: 'anika-creates',
            displayName: "Anika's Kitchen",
            bio: "Helping you cook delicious South Indian food at home.",
            profilePicture: null, // Would be actual URL in production
            socialLinks: {
              instagram: "https://instagram.com/anika-creates",
              youtube: "https://youtube.com/@anikaskitchen",
              twitter: "https://twitter.com/anika_creates"
            },
            products: [
              {
                id: 'prod_001',
                title: 'My Top 5 Chennai Recipes',
                description: 'A PDF guide with authentic South Indian recipes passed down through generations.',
                price: 149,
                type: 'digital',
                image: null
              },
              {
                id: 'prod_002',
                title: '30-Min Coaching Call',
                description: 'A 1:1 session to help you master traditional South Indian cooking techniques.',
                price: 1500,
                type: 'service',
                image: null
              },
              {
                id: 'prod_003',
                title: 'Complete Spice Guide',
                description: 'Learn about 25+ essential spices and how to use them in your cooking.',
                price: 99,
                type: 'digital',
                image: null
              }
            ]
          });
        } else {
          throw new Error('Creator not found');
        }
      } catch (error) {
        console.error('Failed to fetch creator data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorData();
  }, [username]);

  const handleBuyClick = (product) => {
    // Navigate to checkout page
    console.log(`Navigate to checkout: /${username}/checkout/${product.id}`);
    // window.location.href = `/${username}/checkout/${product.id}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-inter">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-600">Loading creator page...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !creatorData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-inter">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="text-6xl">😔</div>
          <h1 className="text-2xl font-bold text-gray-900">Creator Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn't find a creator with the username "{username}".
          </p>
          <a 
            href="/" 
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
          >
            Explore CreatorOS
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-lg mx-auto bg-white min-h-screen">
        
        {/* Creator Profile Header */}
        <div className="text-center pt-8 pb-6 px-6 space-y-4">
          
          {/* Profile Picture */}
          <div className="w-24 h-24 mx-auto">
            {creatorData.profilePicture ? (
              <img 
                src={creatorData.profilePicture} 
                alt={creatorData.displayName}
                className="w-full h-full rounded-full object-cover border-4 border-purple-200"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-purple-200">
                {creatorData.displayName[0]}
              </div>
            )}
          </div>

          {/* Creator Name */}
          <h1 className="text-2xl font-bold text-gray-900">
            {creatorData.displayName}
          </h1>

          {/* Bio */}
          <p className="text-base text-gray-600 leading-relaxed max-w-sm mx-auto">
            {creatorData.bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {creatorData.socialLinks?.instagram && (
              <SocialLink 
                href={creatorData.socialLinks.instagram}
                icon={InstagramIcon}
                platform="Instagram"
              />
            )}
            {creatorData.socialLinks?.youtube && (
              <SocialLink 
                href={creatorData.socialLinks.youtube}
                icon={YoutubeIcon}
                platform="YouTube"
              />
            )}
            {creatorData.socialLinks?.twitter && (
              <SocialLink 
                href={creatorData.socialLinks.twitter}
                icon={XIcon}
                platform="X"
              />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-100"></div>

        {/* Products Section */}
        <div className="p-6 space-y-6">
          {creatorData.products?.length > 0 ? (
            creatorData.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                creatorUsername={username}
                onBuyClick={handleBuyClick}
              />
            ))
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="text-6xl">📦</div>
              <h3 className="text-xl font-semibold text-gray-900">Coming Soon</h3>
              <p className="text-gray-600">
                {creatorData.displayName} is preparing amazing content for you.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 text-center border-t border-gray-200">
          <a 
            href="https://creatoros.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
          >
            Powered by CreatorOS
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicCreatorPage;
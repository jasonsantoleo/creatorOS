import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/ui/Button';

// Copy Icon
const CopyIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>
);

// Check Icon for copied state
const CheckIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

// WhatsApp Icon
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

// Instagram Icon
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// X (Twitter) Icon
const XIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SharePage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock product data - replace with real API call
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const response = await fetch(`/api/products/${productId}`);
        // const productData = await response.json();
        
        // Mock product data
        await new Promise(resolve => setTimeout(resolve, 500));
        setProduct({
          id: productId || 'demo',
          title: 'My Awesome E-book',
          price: 99,
          creatorUsername: 'anika',
          shareUrl: `creatoros.com/anika/my-awesome-ebook`
        });
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleCopyLink = async () => {
    if (!product) return;
    
    const fullUrl = `https://${product.shareUrl}`;
    
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    if (!product) return;
    
    const message = `Check out my new digital product: ${product.title} - https://${product.shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct text sharing via URL
    // This would typically open Instagram app or show copy instructions
    handleCopyLink();
    alert('Link copied! Open Instagram and paste it in your story or post.');
  };

  const handleXShare = () => {
    if (!product) return;
    
    const tweet = `Just launched my new digital product: ${product.title} 🚀 Check it out: https://${product.shareUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleBackToDashboard = () => {
    // Navigate back to dashboard
    console.log('Navigate to dashboard');
    // window.location.href = '/dashboard';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-inter">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-inter">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="max-w-md mx-auto p-6 text-center space-y-8 pt-16">
        
        {/* Celebration Icon */}
        <div className="text-6xl">🚀</div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Your Product is Live!
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Your new product is ready to be shared with the world.
          </p>
        </div>

        {/* Product Link Display */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-purple-600 font-medium break-all">
            {product.shareUrl}
          </p>
        </div>

        {/* Copy Link Button */}
        <Button 
          variant="primary" 
          onClick={handleCopyLink}
          icon={copied ? CheckIcon : CopyIcon}
        >
          {copied ? 'Copied! ✓' : 'Copy Link'}
        </Button>

        {/* Social Share Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <WhatsAppIcon size={24} className="text-green-600" />
              <span className="text-xs font-medium text-gray-700">WhatsApp</span>
            </button>
            
            <button
              onClick={handleInstagramShare}
              className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors"
            >
              <InstagramIcon size={24} className="text-pink-600" />
              <span className="text-xs font-medium text-gray-700">Instagram</span>
            </button>
            
            <button
              onClick={handleXShare}
              className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              <XIcon size={24} className="text-gray-700" />
              <span className="text-xs font-medium text-gray-700">X</span>
            </button>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="pt-8">
          <button
            onClick={handleBackToDashboard}
            className="text-purple-500 hover:text-purple-600 text-base transition-colors"
          >
            Go back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
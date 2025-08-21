import React, { useState, useRef } from 'react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Back Arrow Icon
const BackIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>
  </svg>
);

// Cloud Upload Icon
const CloudUploadIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-gray-400">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    <path d="M12 19L16 15H13V10H11V15H8L12 19Z"/>
  </svg>
);

// File Icon for uploaded files
const FileIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-purple-500">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

// Progress Bar Component
const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const ProductCreationPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate=useNavigate()
  const fileInputRef = useRef(null);

//   const handleBack = () => {
//     // Navigate back to dashboard
//     console.log('Navigate back to dashboard');
//     // window.history.back() or navigate('/dashboard')
//   };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (selectedFile) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: Get secure upload URL from backend
      // const uploadUrlResponse = await fetch('/api/upload/get-url', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     fileName: selectedFile.name,
      //     fileType: selectedFile.type 
      //   })
      // });
      // const { uploadUrl, fileKey } = await uploadUrlResponse.json();

      // Mock upload process for demo
      const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFile({
              name: selectedFile.name,
              size: selectedFile.size,
              type: selectedFile.type,
              url: `https://mock-cdn.com/${selectedFile.name}` // Mock URL
            });
            setIsUploading(false);
          }
          setUploadProgress(Math.min(progress, 100));
        }, 200);
      };

      simulateUpload();

      // Real upload would be:
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // await fetch(uploadUrl, {
      //   method: 'PUT',
      //   body: selectedFile,
      //   onUploadProgress: (progressEvent) => {
      //     const progress = (progressEvent.loaded / progressEvent.total) * 100;
      //     setUploadProgress(progress);
      //   }
      // });

    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      // Show error message to user
    }
  };

  const handlePublish = async () => {
    if (!isFormValid()) return;
    
    setIsPublishing(true);

    try {
      // Create product via API
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     title,
      //     price: parseFloat(price),
      //     fileUrl: file.url,
      //     fileName: file.name
      //   })
      // });
      // const product = await response.json();

      // Mock success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Product published successfully! Redirecting to share screen...');
      // Navigate to share screen with product data
      // navigate('/share', { state: { product } });
      
    } catch (error) {
      console.error('Failed to publish product:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const isFormValid = () => {
    return title.trim() && price && file && !isUploading;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button
            // onClick={handleBack}
            onClick={()=>navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <BackIcon size={20} />
            Back
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ">
            Create New Product
          </h1>
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto p-6 space-y-6">
        
        {/* Product Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., My Awesome E-book"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-base"
            maxLength="100"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="99"
            min="1"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-base"
          />
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product File
          </label>
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-4">
                <CloudUploadIcon size={48} />
                <div>
                  <p className="text-gray-600 mb-2">Uploading...</p>
                  <ProgressBar progress={uploadProgress} />
                  <p className="text-xs text-gray-500 mt-1">{Math.round(uploadProgress)}% complete</p>
                </div>
              </div>
            ) : file ? (
              <div className="space-y-3">
                <FileIcon size={48} />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-purple-500 text-sm hover:text-purple-600"
                >
                  Choose different file
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <CloudUploadIcon size={48} />
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag & drop your file, or{' '}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-purple-500 hover:text-purple-600 underline"
                    >
                      click to browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF, DOCX, ZIP, or other digital files
                  </p>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.docx,.zip,.epub,.mp3,.mp4,.png,.jpg"
            />
          </div>
        </div>

        {/* Publish Button */}
        <div className="pt-4">
          <Button
            variant="primary"
            onClick={handlePublish}
            disabled={!isFormValid()}
          >
            {isPublishing ? 'Publishing...' : 'Publish Product'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCreationPage;
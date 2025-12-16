import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Loader2, UploadCloud } from 'lucide-react';
import { cn } from '../../utils/utility';

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUpload, 
  isUploading = false,
  className 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer relative overflow-hidden group",
          isDragging 
            ? "border-[#FF9933] bg-[#FF9933]/10 scale-[1.01]" 
            : "border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-gray-400 dark:hover:border-slate-600"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="w-12 h-12 text-[#FF9933] animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-300 font-bold text-lg">Uploading image...</p>
            <p className="text-sm text-gray-500">Please wait while we process your file.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-20 h-20 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {isDragging ? (
                <UploadCloud className="w-10 h-10 text-[#FF9933]" />
              ) : (
                <ImageIcon className="w-10 h-10 text-[#000080] dark:text-blue-400" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-white mb-2">
              {isDragging ? "Drop to Upload" : "Click to Upload or Drag & Drop"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Supported formats: SVG, PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileSelect} 
        disabled={isUploading}
      />
    </div>
  );
};
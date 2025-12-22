'use client';

import { useState, useRef } from 'react';
import { uploadProductImage, deleteProductImage } from '@/lib/supabase';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  productSlug: string;
}

export default function ImageUploader({ images, onChange, productSlug }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`הקובץ ${file.name} אינו תמונה`);
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`הקובץ ${file.name} גדול מדי (מקסימום 5MB)`);
        }

        const url = await uploadProductImage(file, productSlug || 'product');
        if (!url) {
          throw new Error(`שגיאה בהעלאת ${file.name}`);
        }
        return url;
      });

      const newUrls = await Promise.all(uploadPromises);
      onChange([...images, ...newUrls]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'שגיאה בהעלאת התמונות');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddUrl = () => {
    if (!manualUrl.trim()) return;
    
    // Basic URL validation
    try {
      new URL(manualUrl);
      onChange([...images, manualUrl.trim()]);
      setManualUrl('');
    } catch {
      setUploadError('כתובת URL לא תקינה');
    }
  };

  const handleRemove = async (index: number) => {
    const imageUrl = images[index];
    
    // Only try to delete from storage if it's a Supabase URL
    if (imageUrl.includes('supabase')) {
      await deleteProductImage(imageUrl);
    }
    
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleReorder = (fromIndex: number, direction: 'up' | 'down') => {
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= images.length) return;

    const newImages = [...images];
    [newImages[fromIndex], newImages[toIndex]] = [newImages[toIndex], newImages[fromIndex]];
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Current Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`תמונה ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleReorder(index, 'up')}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="הזז שמאלה"
                  >
                    ←
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  title="הסר תמונה"
                >
                  ✕
                </button>
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleReorder(index, 'down')}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="הזז ימינה"
                  >
                    →
                  </button>
                )}
              </div>

              {/* Primary badge */}
              {index === 0 && (
                <div className="absolute top-2 right-2 bg-primary-turquoise text-white text-xs px-2 py-1 rounded">
                  ראשית
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-turquoise transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        
        {isUploading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-turquoise"></div>
            <span className="text-gray-600">מעלה תמונות...</span>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-2">📷</div>
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-primary-turquoise hover:underline"
            >
              לחץ להעלאת תמונות
            </label>
            <p className="text-gray-500 text-sm mt-1">
              או גרור קבצים לכאן (JPG, PNG, WebP עד 5MB)
            </p>
          </>
        )}
      </div>

      {/* Manual URL Input */}
      <div className="flex gap-2">
        <input
          type="url"
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          placeholder="או הזן כתובת URL של תמונה..."
          className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
          dir="ltr"
        />
        <button
          type="button"
          onClick={handleAddUrl}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          הוסף
        </button>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
          {uploadError}
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        התמונה הראשונה תהיה התמונה הראשית של המוצר. ניתן לגרור כדי לשנות סדר.
      </p>
    </div>
  );
}


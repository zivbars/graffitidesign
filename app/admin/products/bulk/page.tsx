'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Product, categoryNames, Category } from '@/types/product';

interface EditableProduct extends Product {
  isSelected: boolean;
  editedName?: string;
  imageRotation?: number;
  newImageUrl?: string; // For image replacement
}

export default function BulkEditPage() {
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<EditableProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState<string | null>(null); // productId or 'bulk'
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [imageSearchTerm, setImageSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProducts();
    loadAvailableImages();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      const editableProducts = data.map((p) => ({
        ...p,
        isSelected: false,
        editedName: p.name,
        imageRotation: 0,
        newImageUrl: undefined,
      }));
      setProducts(editableProducts);
      setFilteredProducts(editableProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadAvailableImages() {
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        const data = await res.json();
        setAvailableImages(data.images || []);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      // Fallback: collect images from products
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      const allImages = data.flatMap(p => p.images);
      setAvailableImages(Array.from(new Set(allImages)));
    }
  }

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.editedName?.toLowerCase().includes(term) ||
          p.slug.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleSelectAll = useCallback(() => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setProducts((prev) =>
      prev.map((p) => {
        const isInFiltered = filteredProducts.some((fp) => fp.id === p.id);
        return {
          ...p,
          isSelected: isInFiltered ? newSelectAll : p.isSelected,
        };
      })
    );
  }, [selectAll, filteredProducts]);

  const handleSelect = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isSelected: !p.isSelected } : p
      )
    );
  };

  const handleNameChange = (productId: string, newName: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, editedName: newName } : p
      )
    );
    setHasChanges(true);
  };

  const handleRotateImage = (productId: string, direction: 'cw' | 'ccw') => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentRotation = p.imageRotation || 0;
          const newRotation = direction === 'cw' 
            ? (currentRotation + 90) % 360 
            : (currentRotation - 90 + 360) % 360;
          return { ...p, imageRotation: newRotation };
        }
        return p;
      })
    );
    setHasChanges(true);
  };

  const handleBulkRotate = (direction: 'cw' | 'ccw') => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.isSelected) {
          const currentRotation = p.imageRotation || 0;
          const newRotation = direction === 'cw' 
            ? (currentRotation + 90) % 360 
            : (currentRotation - 90 + 360) % 360;
          return { ...p, imageRotation: newRotation };
        }
        return p;
      })
    );
    setHasChanges(true);
  };

  const handleImageChange = (productId: string, newImageUrl: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, newImageUrl } : p
      )
    );
    setHasChanges(true);
    setShowImagePicker(null);
  };

  const handleBulkImageChange = (newImageUrl: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.isSelected ? { ...p, newImageUrl } : p
      )
    );
    setHasChanges(true);
    setShowImagePicker(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, productId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the uploaded file
    const previewUrl = URL.createObjectURL(file);
    
    if (productId) {
      handleImageChange(productId, previewUrl);
    } else {
      // Bulk upload - apply to all selected
      handleBulkImageChange(previewUrl);
    }

    // Reset file input
    e.target.value = '';
  };

  const selectedCount = products.filter((p) => p.isSelected).length;
  const changedProducts = products.filter(
    (p) => p.editedName !== p.name || (p.imageRotation && p.imageRotation !== 0) || p.newImageUrl
  );

  const filteredAvailableImages = availableImages.filter(img => 
    imageSearchTerm ? img.toLowerCase().includes(imageSearchTerm.toLowerCase()) : true
  );

  const handleSaveChanges = async () => {
    if (changedProducts.length === 0) {
      alert('אין שינויים לשמור');
      return;
    }

    setIsSaving(true);
    try {
      // Here you would typically save to your backend/database
      // For now, we'll just show what would be saved
      const changes = changedProducts.map((p) => ({
        id: p.id,
        name: p.editedName,
        imageRotation: p.imageRotation,
        newImage: p.newImageUrl,
      }));
      
      console.log('Changes to save:', changes);
      alert(`נשמרו ${changedProducts.length} שינויים!\n\nהשינויים:\n${changes.map(c => `- ${c.id}: שם="${c.name}", סיבוב=${c.imageRotation}°${c.newImage ? ', תמונה חדשה' : ''}`).join('\n')}`);
      
      // Reset changes tracking
      setProducts((prev) =>
        prev.map((p) => ({
          ...p,
          name: p.editedName || p.name,
          images: p.newImageUrl ? [p.newImageUrl, ...p.images.slice(1)] : p.images,
          imageRotation: 0,
          newImageUrl: undefined,
        }))
      );
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('שגיאה בשמירת השינויים');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">טוען מוצרים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">עריכה מרובה</h1>
          <p className="text-gray-600 mt-1">
            {products.length} מוצרים • {selectedCount} נבחרו • {changedProducts.length} שינויים
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← חזרה
          </Link>
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges || isSaving}
            className="bg-primary-turquoise text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-turquoise/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="animate-spin">⏳</span>
                שומר...
              </>
            ) : (
              <>
                <span>💾</span>
                שמור שינויים ({changedProducts.length})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="חיפוש מוצרים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise bg-white"
          >
            <option value="all">כל הקטגוריות</option>
            {Object.entries(categoryNames).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">{selectedCount} נבחרו:</span>
            <button
              onClick={() => handleBulkRotate('ccw')}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              <span className="text-lg">↺</span>
              סובב 90° שמאלה
            </button>
            <button
              onClick={() => handleBulkRotate('cw')}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              <span className="text-lg">↻</span>
              סובב 90° ימינה
            </button>
            <button
              onClick={() => setShowImagePicker('bulk')}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
            >
              <span className="text-lg">🖼️</span>
              החלף תמונה לכולם
            </button>
            <input
              ref={bulkFileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e)}
              className="hidden"
            />
            <button
              onClick={() => bulkFileInputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm"
            >
              <span className="text-lg">📤</span>
              העלה תמונה חדשה לכולם
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Select All Header */}
        <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-5 h-5 rounded border-gray-300 text-primary-turquoise focus:ring-primary-turquoise"
            />
            <span className="text-sm font-medium text-gray-700">בחר הכל ({filteredProducts.length})</span>
          </label>
        </div>

        {/* Products List */}
        <div className="divide-y divide-gray-100">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`p-4 flex flex-col sm:flex-row gap-4 transition-colors ${
                product.isSelected ? 'bg-primary-turquoise/5' : 'hover:bg-gray-50'
              }`}
            >
              {/* Checkbox */}
              <div className="flex items-start pt-1">
                <input
                  type="checkbox"
                  checked={product.isSelected}
                  onChange={() => handleSelect(product.id)}
                  className="w-5 h-5 rounded border-gray-300 text-primary-turquoise focus:ring-primary-turquoise"
                />
              </div>

              {/* Image with Rotation & Replace Controls */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative ${product.newImageUrl ? 'ring-2 ring-green-500' : ''}`}
                  style={{
                    transform: `rotate(${product.imageRotation || 0}deg)`,
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {(product.newImageUrl || product.images[0]) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.newImageUrl || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {product.newImageUrl && (
                    <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded">
                      חדש
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleRotateImage(product.id, 'ccw')}
                    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                    title="סובב 90° שמאלה"
                  >
                    ↺
                  </button>
                  <button
                    onClick={() => handleRotateImage(product.id, 'cw')}
                    className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                    title="סובב 90° ימינה"
                  >
                    ↻
                  </button>
                  <button
                    onClick={() => setShowImagePicker(product.id)}
                    className="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg transition-colors text-green-700"
                    title="החלף תמונה"
                  >
                    🖼️
                  </button>
                </div>
                {product.imageRotation !== 0 && (
                  <span className="text-xs text-blue-600 font-medium">
                    {product.imageRotation}°
                  </span>
                )}
                {product.newImageUrl && (
                  <button
                    onClick={() => handleImageChange(product.id, '')}
                    className="text-xs text-red-500 hover:underline"
                  >
                    בטל שינוי
                  </button>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-grow space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">שם המוצר</label>
                  <input
                    type="text"
                    value={product.editedName}
                    onChange={(e) => handleNameChange(product.id, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise ${
                      product.editedName !== product.name
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200'
                    }`}
                  />
                  {product.editedName !== product.name && (
                    <p className="text-xs text-yellow-600 mt-1">
                      שם מקורי: {product.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {categoryNames[product.category]}
                  </span>
                  <span>₪{product.price}</span>
                  <span className="text-gray-400">{product.slug}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex sm:flex-col gap-2 justify-end">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="text-xs text-primary-turquoise hover:underline"
                >
                  עריכה מלאה
                </Link>
                <Link
                  href={`/product/${product.slug}`}
                  target="_blank"
                  className="text-xs text-gray-500 hover:underline"
                >
                  צפה באתר
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-gray-600">לא נמצאו מוצרים</p>
          </div>
        )}
      </div>

      {/* Floating Save Button (Mobile) */}
      {hasChanges && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden">
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="w-full bg-primary-turquoise text-white px-6 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2"
          >
            {isSaving ? 'שומר...' : `💾 שמור ${changedProducts.length} שינויים`}
          </button>
        </div>
      )}

      {/* Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {showImagePicker === 'bulk' ? `בחר תמונה ל-${selectedCount} מוצרים` : 'בחר תמונה'}
              </h3>
              <button
                onClick={() => {
                  setShowImagePicker(null);
                  setImageSearchTerm('');
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Search & Upload */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="חפש תמונה..."
                value={imageSearchTerm}
                onChange={(e) => setImageSearchTerm(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, showImagePicker === 'bulk' ? undefined : showImagePicker)}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <span>📤</span>
                העלה תמונה חדשה
              </button>
            </div>

            {/* Image Grid */}
            <div className="flex-grow overflow-y-auto p-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {filteredAvailableImages.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (showImagePicker === 'bulk') {
                        handleBulkImageChange(imageUrl);
                      } else {
                        handleImageChange(showImagePicker, imageUrl);
                      }
                    }}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-turquoise transition-all group relative"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={`תמונה ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 text-2xl">✓</span>
                    </div>
                  </button>
                ))}
              </div>

              {filteredAvailableImages.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🖼️</div>
                  <p className="text-gray-600">לא נמצאו תמונות</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 text-primary-turquoise hover:underline"
                  >
                    העלה תמונה חדשה
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
              <span>{filteredAvailableImages.length} תמונות זמינות</span>
              <button
                onClick={() => {
                  setShowImagePicker(null);
                  setImageSearchTerm('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


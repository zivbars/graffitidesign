'use client';

import { useState, FormEvent } from 'react';
import { reviews } from '@/data/reviews';
import ReviewCard from '@/components/ReviewCard';
import Button from '@/components/Button';
import { Review } from '@/types/review';

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredReviews =
    filterRating === 'all'
      ? reviews
      : reviews.filter((r) => r.rating === filterRating);

  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    const savedReviews: Review[] = JSON.parse(
      localStorage.getItem('user_reviews') || '[]'
    );
    const newReview: Review = {
      id: `user-${Date.now()}`,
      ...formData,
      date: new Date().toISOString(),
    };
    savedReviews.push(newReview);
    localStorage.setItem('user_reviews', JSON.stringify(savedReviews));

    // Show success
    setShowSuccess(true);
    setFormData({ name: '', rating: 5, text: '' });
    setShowForm(false);

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-base-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/reviews.png')] bg-cover bg-center blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black font-fredoka mb-6 tracking-tight">
            מה הלקוחות שלנו אומרים?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            הצטרפו לאלפי לקוחות מרוצים שכבר שדרגו את הבית עם המוצרים שלנו
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Average Rating */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-right border-b lg:border-b-0 lg:border-l border-gray-100 pb-8 lg:pb-0 lg:pl-12">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-7xl font-black text-primary-pink">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex flex-col">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${
                          i < Math.round(averageRating)
                            ? 'text-primary-mustard fill-current'
                            : 'text-gray-200'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 font-medium">
                    מתוך {reviews.length} חוות דעת
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={() => setShowForm(!showForm)} 
                className="w-full md:w-auto shadow-lg hover:shadow-xl transition-all"
              >
                {showForm ? 'סגור טופס' : 'כתוב ביקורת משלך'}
              </Button>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-4 group">
                  <div className="w-12 font-bold text-gray-400 group-hover:text-primary-mustard transition-colors">
                    {rating} <span className="text-xs">★</span>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-primary-mustard h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-left text-sm text-gray-400 font-mono">
                    {percentage.toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 animate-slideIn border border-primary-pink/20">
            <h3 className="text-2xl font-bold text-base-black mb-6">
              נשמח לשמוע את דעתך
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    שם מלא *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-pink/50 transition-all bg-gray-50 focus:bg-white"
                    placeholder="איך לקרוא לך?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    דירוג החוויה *
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: Number(e.target.value) })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-pink/50 transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ מצוין - אהבתי מאוד!</option>
                    <option value="4">⭐⭐⭐⭐ טוב מאוד - מרוצה</option>
                    <option value="3">⭐⭐⭐ טוב - סביר</option>
                    <option value="2">⭐⭐ לא משהו - טעון שיפור</option>
                    <option value="1">⭐ מאכזב - לא אהבתי</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  הביקורת שלך *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-pink/50 transition-all bg-gray-50 focus:bg-white resize-none"
                  placeholder="ספרו לנו איך היה המוצר, השירות והחוויה הכללית..."
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  פרסם ביקורת
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-base-black text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce z-50">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">✓</div>
            <span className="font-bold">תודה! הביקורת שלך התקבלה בהצלחה</span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          <button
            onClick={() => setFilterRating('all')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              filterRating === 'all'
                ? 'bg-base-black text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            הכל
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilterRating(rating)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                filterRating === rating
                  ? 'bg-primary-mustard text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {rating} כוכבים
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
            <div className="text-6xl mb-4 opacity-50">💬</div>
            <h3 className="text-xl font-bold text-gray-400">
              לא נמצאו ביקורות בדירוג שנבחר
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="h-full">
                 <ReviewCard review={review} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

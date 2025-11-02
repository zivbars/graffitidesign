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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/reviews.png')" }}
    >
      {/* Overlay for better text readability */}
      <div className="bg-white/85 min-h-screen">
        <div className="container mx-auto px-4 py-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-base-black mb-4">
          ביקורות לקוחות
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          קראו מה הלקוחות שלנו אומרים על המוצרים והשירות שלנו
        </p>
      </div>

      {/* Rating Summary */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-right">
            <div className="text-6xl font-bold text-primary-pink mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center md:justify-start gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${
                    i < Math.round(averageRating)
                      ? 'text-primary-mustard fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600">
              מבוסס על {reviews.length} ביקורות
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">
                  {rating} כוכבים
                </span>
                <div className="flex-1 bg-base-gray/30 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary-mustard h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Add Review */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        {/* Filter */}
        <div className="flex items-center gap-3">
          <label className="font-semibold text-gray-700">סינון:</label>
          <select
            value={filterRating}
            onChange={(e) =>
              setFilterRating(
                e.target.value === 'all' ? 'all' : Number(e.target.value)
              )
            }
            className="px-4 py-2 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
          >
            <option value="all">כל הדירוגים</option>
            <option value="5">5 כוכבים</option>
            <option value="4">4 כוכבים</option>
            <option value="3">3 כוכבים</option>
            <option value="2">2 כוכבים</option>
            <option value="1">1 כוכב</option>
          </select>
        </div>

        {/* Add Review Button */}
        <Button onClick={() => setShowForm(!showForm)} variant="secondary">
          {showForm ? 'ביטול' : 'הוסף ביקורת'}
        </Button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-primary-turquoise/10 border border-primary-turquoise text-primary-turquoise px-6 py-4 rounded-lg mb-8">
          ✓ תודה על הביקורת! היא נשמרה בהצלחה
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-base-black mb-4">
            כתבו ביקורת
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                שם מלא *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
                placeholder="השם שלך"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                דירוג *
              </label>
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              >
                <option value="5">⭐⭐⭐⭐⭐ מצוין</option>
                <option value="4">⭐⭐⭐⭐ טוב מאוד</option>
                <option value="3">⭐⭐⭐ טוב</option>
                <option value="2">⭐⭐ בסדר</option>
                <option value="1">⭐ לא טוב</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                הביקורת שלך *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) =>
                  setFormData({ ...formData, text: e.target.value })
                }
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-base-gray focus:outline-none focus:ring-2 focus:ring-primary-turquoise resize-none"
                placeholder="שתפו אותנו בחוויה שלכם..."
              />
            </div>

            <Button type="submit" size="md">
              שלח ביקורת
            </Button>
          </form>
        </div>
      )}

      {/* Reviews Grid */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          אין ביקורות בדירוג זה
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
}


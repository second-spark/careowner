import { Practice } from '../types/practice';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewsTabProps {
  practice: Practice;
}

export function ReviewsTab({ practice }: ReviewsTabProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-5xl mb-2">{practice.googleRating}</div>
            <div className="flex gap-1 mb-2">
              {renderStars(Math.round(practice.googleRating))}
            </div>
            <p className="text-sm text-muted-foreground">Google Rating</p>
            <p className="text-sm text-muted-foreground">{practice.reviews.length} reviews</p>
          </div>

          <div className="flex-1">
            <h3 className="mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = practice.reviews.filter(r => r.rating === rating).length;
                const percentage = (count / practice.reviews.length) * 100;
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm w-12">{rating} stars</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="w-5 h-5 text-green-600" />
            <h3>Positive Highlights</h3>
          </div>
          <ul className="space-y-2">
            {practice.reviewSummary.positive.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ThumbsDown className="w-5 h-5 text-orange-600" />
            <h3>Areas for Improvement</h3>
          </div>
          <ul className="space-y-2">
            {practice.reviewSummary.negative.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">!</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Individual Reviews */}
      <div>
        <h3 className="mb-4">Recent Reviews</h3>
        <div className="space-y-4">
          {practice.reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p>{review.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-muted-foreground">{review.text}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Source Attribution */}
      <Card className="p-4 bg-gray-50">
        <p className="text-sm text-muted-foreground">
          Reviews sourced from Google Business Profile. Last synced:{' '}
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </Card>
    </div>
  );
}

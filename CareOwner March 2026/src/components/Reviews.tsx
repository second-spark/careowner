import { ReviewsTab } from './ReviewsTab';
import { Practice } from '../types/practice';

interface ReviewsProps {
  practice: Practice;
}

export function Reviews({ practice }: ReviewsProps) {
  return (
    <div>
      <h1 className="mb-6 text-[20px] font-semibold">Reviews</h1>
      <ReviewsTab practice={practice} />
    </div>
  );
}

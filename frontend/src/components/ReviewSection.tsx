import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import ReviewDialog from './ReviewDialog';

interface Review {
  text?: string;
  score: number;
}

interface ReviewSectionProps {
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [DialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 10);
  };

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < score ? 'text-sky-700' : 'text-gray-300'
        }`}
      />
    ));
  };

  const reviewsToShow = reviews.filter((review) => review.text).slice(0, visibleReviews);

  return (

    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
        <Button className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-500" onClick={handleOpenDialog}>
          Add a Review
        </Button>
        <ReviewDialog Id={'1'} isOpen={DialogOpen} onClose={handleCloseDialog} type='product' />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviewsToShow.map((review, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              {renderStars(review.score)}
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
      {visibleReviews < reviews.length && (
        <div className="flex justify-center mt-8">
          <Button
            className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-500"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import ReviewDialog from './ReviewDialog';
import axios from 'axios';
import { Review } from '@/components/types/Review';


interface ReviewSectionProps {
  reviews: Review[];
  id:string;
}

export default function ReviewSection ({ reviews,id }: ReviewSectionProps){
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'review-sky-700' : 'review-gray-300'
        }`}
      />
    ));
  };

  const reviewsToShow = reviews.filter((review) => review.review).slice(0, visibleReviews);

  return (

    <div className='shadow-md my-5'>
      <div className="lg:w-[1500px] md:w-[1000px] w-[600px] flex flex-row justify-around my-3 px-4 ">
        <h2 className="review-3xl font-bold mb-8 review-center text-white">Customer Reviews</h2>
        <Button className="px-4 py-2 bg-sky-600 review-white rounded hover:bg-sky-500" onClick={handleOpenDialog}>
          Add a Review
        </Button>
        <ReviewDialog Id={id} isOpen={DialogOpen} onClose={handleCloseDialog} type='product' />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviewsToShow.map((review, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              {renderStars(review.rating)}
            </div>
            <p className="review-gray-700">{review.review}</p>
          </div>
        ))}
      </div>
      {visibleReviews < reviews.length && (
        <div className="flex justify-center mt-8">
          <Button
            className="px-4 py-2 bg-sky-600 review-white rounded hover:bg-sky-500"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

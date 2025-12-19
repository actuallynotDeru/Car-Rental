import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
  showValue?: boolean;
}

const StarRating = ({ 
  rating, 
  onRate, 
  readonly = false, 
  size = 20,
  showValue = true 
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleClick = (starIndex: number) => {
    if (!readonly && onRate) {
      onRate(starIndex);
    }
  };

  const handleMouseEnter = (starIndex: number) => {
    if (!readonly) {
      setHoverRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isHalf = star - 0.5 <= displayRating && star > displayRating;
          
          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform focus:outline-none`}
            >
              <Star
                size={size}
                className={`transition-colors ${
                  isFilled 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : isHalf 
                      ? 'text-yellow-400 fill-yellow-400/50'
                      : 'text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;

import { Star } from "lucide-react";

function StarRatingComponent({ rating = 0, handleRatingChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= Math.round(rating);
        return (
          <button
            key={star}
            type="button"
            disabled={!handleRatingChange}
            onClick={handleRatingChange ? () => handleRatingChange(star) : undefined}
            className={`p-1 rounded-md transition-transform duration-150 ${
              handleRatingChange ? "hover:scale-125 focus:outline-none cursor-pointer" : "cursor-default"
            }`}
          >
            <Star
              className={`w-4 h-4 transition-colors ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-zinc-200 text-zinc-300 dark:fill-zinc-800 dark:text-zinc-700"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default StarRatingComponent;
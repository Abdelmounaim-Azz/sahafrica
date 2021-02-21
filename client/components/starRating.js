import { useState } from "react";
import Star from "./Star";

const useStarRating = () => {
  const [starsSelected, selectStar] = useState(0);
  const content = (
    <div className="star-rating">
      {[...Array(5)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => selectStar(i + 1)}
        />
      ))}
    </div>
  );
  return {
    content,
    starsSelected,
  };
};
export default useStarRating;

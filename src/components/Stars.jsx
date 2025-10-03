import React from "react";
import { FaStar,FaStarHalfAlt,FaRegStar } from "react-icons/fa";

const Stars = React.memo(({ rating }) => {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }, (_, index) => {
        if (rating >= index + 1) {
          return <FaStar key={index} />;
        } else if (rating > index && rating < index + 1) {
          return <FaStarHalfAlt key={index} />;
        } else {
          return <FaRegStar key={index} />;
        }
      })}
    </div>
  );
});

export default Stars;
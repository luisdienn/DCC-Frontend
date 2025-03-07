import { StarIcon } from "@heroicons/react/24/solid";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-4 h-6 md:w-6 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;

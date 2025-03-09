import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FaStar, FaRegStar } from "react-icons/fa";
// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StarRating from "./starRating";

interface Review {
  comentario: string;
  estrellas: number;
  etiquetas: string[];
}

const ReviewCarousel = ({ reviews }: { reviews?: Review[] }) => {
  if (!reviews || reviews.length === 0) return null; // Evita errores si reviews es undefined o vacío

  return (
    <section className="w-full max-w-[85%] p-6 mx-auto">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={20}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-lg"
      >
        {reviews
          .filter(
            (review) => review.comentario && review.comentario.trim() !== ""
          ) 
          .map((review, index) => (
            <SwiperSlide key={index}>
              <div className="flex-none w-full relative group rounded-lg overflow-hidden shadow-md bg-white border border-gray-300 p-6 h-[200px] flex flex-col justify-between">
                <p className="text-gray-600 italic text-md text-center">
                  "{review.comentario}"
                </p>

                <div className="text-center">
                  <div className="flex justify-center mt-1 text-yellow-500">
                    <StarRating rating={review.estrellas} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: #e5e7eb;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background-color: #1f2937;
        }
      `}</style>
    </section>
  );
};

export default ReviewCarousel;

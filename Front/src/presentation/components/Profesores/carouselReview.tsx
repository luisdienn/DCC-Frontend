import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FaStar, FaRegStar } from "react-icons/fa";
import TagList from "./tagList";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Review {
    course: string;
    comment: string;
    rating: number;
}
const tags = ["Explica bien", "Actitud", "Conversación"];

const fakeReviews: Review[] = [
    { course: "Matematicas Discretas", rating: 5, comment: "¡Excelente profesor! Explica muy bien y resuelve todas las dudas." },
    { course: "Programacion de ", rating: 4, comment: "Muy buen profesor, aunque a veces va un poco rápido en las explicaciones." },
    { course: "Javier Méndez", rating: 3, comment: "El profesor es bueno, pero podría mejorar la interacción con los estudiantes." },
];

const ReviewCarousel = ({ professor }: { professor: string }) => {
    return (
        <section className="w-full max-w-[85%] p-6 mx-auto">
            {/* Título */}
            {/* <h2 className="text-2xl font-bold text-center mb-4">Reseñas de {professor}</h2> */}

            {/* Swiper Carrusel */}
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                {fakeReviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex-none w-full relative group rounded-lg overflow-hidden shadow-md bg-white border border-gray-300 p-6 h-[200px] flex flex-col justify-between">
                            {/* Mensaje */}
                            <p className="text-gray-600 italic text-md text-center">
                                "{review.comment}"
                            </p>
                            {/* <TagList tags={tags} /> */}

                            {/* Información */}
                            <div className="text-center">
                                {/* <h3 className="font-bold text-lg">{review.course}</h3> */}
                                {/* Estrellas */}
                                <div className="flex justify-center mt-1 text-yellow-500">
                                    {Array.from({ length: 5 }, (_, i) =>
                                        i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Estilos personalizados para la paginación */}
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

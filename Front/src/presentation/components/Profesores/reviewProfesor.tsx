/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import StarRating from "./starRating";
import TagList from "./tagList";
import ReviewCarousel from "./carouselReview";

const tags = ["Explica bien", "Actitud", "Conversación", "Llega temprano"];

const Review = () => {
  return (
    <>
      <Head>
        <title>Review | Robert Newman</title>
        <meta name="description" content="Perfil de Jessica Jones" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
        {/* Header con fondo decorativo y círculos */}
        <section className="relative w-full h-[50vh] bg-gradient-to-r from-blue-300 to-indigo-500">
          {/* Círculos decorativos */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full top-10 left-16"></div>
            <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-20 right-20"></div>
          </div>
        </section>
        {/* Tarjeta del perfil */}
        <section className="relative w-full flex justify-center -mt-56">
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-6xl w-full text-center relative">
            <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2">
              <img
                className="w-32 h-32 rounded-full shadow"
                src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                alt="Profile"
              />
            </div>
            <div className="flex justify-around mt-6 text-gray-600">
              <div className="text-center p-2 mr-36 md:mr-0">
                <StarRating rating={4} /> {/* Estrellas estáticas (4/5) */}
              </div>
         
              <div className="text-center">
                <button className="bg-green-500 text-white md:mr-6 md:p-2 md:pl-4 md:pr-4 p-1 pl-3 pr-3 rounded-lg">
                  Calificar
                </button>
              </div>
            </div>
            <h3 className="text-2xl text-black font-semibold mt-4">
              Robert Newman <span className="text-gray-400">, 27</span>
            </h3>
            <p className="text-gray-500 text-sm">CENFOTEC</p>
            <br />
            <div className="">
              <TagList tags={tags} />
            </div>
            <br />
            <ReviewCarousel professor="Robert Newman" />
          </div>
        </section>
        {/* Pie de página */}
        <footer className="text-center py-6 text-gray-600 w-full mt-10">
          <p>
            &copy; {new Date().getFullYear()} Codify. Todos los
            derechos reservados.
          </p>
        </footer>
      </main>
    </>
  );
};
export default Review;

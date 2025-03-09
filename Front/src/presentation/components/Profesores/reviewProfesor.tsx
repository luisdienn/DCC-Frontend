/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import StarRating from "./starRating";
import TagList from "./tagList";
import ReviewCarousel from "./carouselReview";
import { getProfessorById } from "@/domain/repositories/professorRepository";
import { getReviewsByProfessorId } from "@/domain/repositories/reviewRepository";
import { useRouter } from "next/router";
import ModalCalificar from "./modalCalificar";

const Review = () => {
  const [professor, setProfessor] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isCalificarProfesorOpen, setIsCalificarProfesorOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const router = useRouter();
  const { id } = router.query; // Obtiene el ID del profesor desde la URL

  const totalEstrellas = (reviews || []).reduce(
    (acc, review) => acc + review.estrellas,
    0
  ); // acc ACUMULADOR, el cero del final es el valor de acc
  const promedioEstrellas =
    reviews && reviews.length > 0 ? totalEstrellas / reviews.length : 0; // asegurar que reviews no sea NULL

  useEffect(() => {
    if (!id) return; // Evita llamar a la API si el ID aún no está disponible

    const fetchProfessor = async () => {
      try {
        const professorData = await getProfessorById(id as string);
        console.log(professorData);
        setProfessor(professorData);
      } catch (err) {
        console.error("Error al obtener el profesor:", err);
      }
    };

    const fetchReviewsProfessor = async () => {
      try {
        const reviewData = await getReviewsByProfessorId(id as string);
        setReviews(reviewData);

        const etiquetasContador: Record<string, number> = {};
        reviewData.forEach((review) => {
          review.etiquetas.forEach((etiqueta: string) => {
            etiquetasContador[etiqueta] = // aqui accede a la clave del diccionario, que seria el nombre de la etiqueta
              (etiquetasContador[etiqueta] || 0) + 1; // si existe trae el valor, o sea el numero, si no, se asigna como 0 para sumarle 1
          });
        });

        const etiquetasOrdenadas = Object.keys(etiquetasContador)
          .sort((a, b) => etiquetasContador[b] - etiquetasContador[a])
          // "Motivador" vs "Paciente" → etiquetasContador["Motivador"] (5) - etiquetasContador["Paciente"] (3) = 2 (Motivador va antes)
          // "Claro" vs "Explica bien" → etiquetasContador["Claro"] (4) - etiquetasContador["Explica bien"] (2) = 2 (Claro va antes)

          // Primera comparación: a = "Paciente", b = "Motivador"
          // Segunda comparación: a = "Explica bien", b = "Claro"
          // Tercera comparación: a = "Motivador", b = "Explica bien"
          // Y así sucesivamente...

          .slice(0, 4); // Toma las primeras 4 etiquetas

        setTags(etiquetasOrdenadas);
      } catch (err) {
        console.error("Error al obtener las reviews del profesor:", err);
      }
    };

    fetchProfessor();
    fetchReviewsProfessor();
  }, [id]);

  // --------- MODAL CALIFICAR PROFESOR --------- //
  const openCalificarProfesorModal = () => {
    setIsCalificarProfesorOpen(true);
  };
  const closeCalificarProfesorModal = () => {
    setIsCalificarProfesorOpen(false);
  };

  return (
    <>
      <Head>
        <title>Review | {professor?.nombre}</title>
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
                // src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                src="https://sm.ign.com/ign_pk/cover/a/avatar-gen/avatar-generations_rpge.jpg"
                alt="Profile"
              />
            </div>
            <div className="flex justify-around mt-6 text-gray-600">
              <div className="text-center p-2 mr-36 md:mr-0">
                <StarRating rating={promedioEstrellas} />{" "}
                {/* Estrellas estáticas (4/5) */}
              </div>

              <div className="text-center">
                <button
                  className="bg-green-500 text-white md:mr-6 md:p-2 md:pl-4 md:pr-4 p-1 pl-3 pr-3 rounded-lg"
                  onClick={() => openCalificarProfesorModal()}
                >
                  Calificar
                </button>
              </div>
            </div>
            <h3 className="text-2xl text-black font-semibold mt-4">
              {/* Robert Newman */}
              {professor?.nombre + " " + professor?.apellidos}
            </h3>
            <p className="text-gray-500 text-sm">{professor?.universidad}</p>
            <br />
            <div className="">
              <TagList tags={tags} />
            </div>
            <br />
            <ReviewCarousel reviews={reviews} />
          </div>
        </section>
        {/* Pie de página */}
        <footer className="text-center py-6 text-gray-600 w-full mt-10">
          <p>
            &copy; {new Date().getFullYear()} Codify. Todos los derechos
            reservados.
          </p>
        </footer>
        {isCalificarProfesorOpen && (
          <ModalCalificar
            closeModal={closeCalificarProfesorModal}
            professorId={professor?.id}
            professorName={professor.nombre}
          />
        )}
      </main>
    </>
  );
};
export default Review;

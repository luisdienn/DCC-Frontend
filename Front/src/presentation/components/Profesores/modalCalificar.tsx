import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { StarIcon } from "@heroicons/react/24/solid";
import { createReview } from "@/domain/repositories/reviewRepository";

const ModalCalificar = ({
  closeModal,
  professorId,
  professorName,
  professorMaterias,
}: any) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [totalStars, setTotalStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comentario, setComentario] = useState("");
  const [materia, setMateria] = useState(() =>
    professorMaterias.length > 0 ? professorMaterias[0].nombre : ""
  );

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 2) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleStarClick = (currentRating: number) => {
    setRating(currentRating);
    setSelectedTags([]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (rating === 0 || rating === null) {
      console.log("Debe seleccionar al menos una estrella");
      return;
    }
    if (selectedTags.length === 0) {
      console.log("Debe seleccionar al menos una etiqueta");
      return;
    }

    const reviewData = {
      estrellas: rating,
      etiquetas: selectedTags,
      comentario: comentario || "",
      id_profesor: professorId,
      materia: materia,
      fecha_creacion: new Date().toISOString(),
    };
    console.log(reviewData);
    console.log("ID del profesor:", typeof professorId, professorId);
    try {
      const response = await createReview(reviewData);
      console.log("Reseña enviada con éxito:", response);
      closeModal();
      window.location.reload();
    } catch (error: any) {
      console.error("Error al enviar la reseña:", error);
    }
  };

  const tagsByRating: { [key: number]: string[] } = {
    1: [
      "No explica bien",
      "Mala actitud",
      "No responde dudas",
      "Clases aburridas",
      "Demasiado exigente",
    ],
    2: [
      "Podría mejorar",
      "Falta claridad",
      "Responde con demora",
      "Desorganizado",
      "Difícil de entender",
    ],
    3: [
      "Aceptable",
      "Explicaciones básicas",
      "Cumple con lo justo",
      "Poco dinámico",
      "Regular comunicación",
    ],
    4: [
      "Explica bien",
      "Buena actitud",
      "Responde dudas",
      "Clases dinámicas",
      "Buen ritmo",
    ],
    5: [
      "Excelente docente",
      "Clases entretenidas",
      "Muy claro",
      "Siempre disponible",
      "Inspira a aprender",
    ],
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
        </button>
        <h2 className="text-center text-xl font-bold text-gray-700">
          ¿Cómo calificas al profesor?
        </h2>
        <p className="text-center text-lg font-semibold">{professorName}</p>
        
        {/* Estrellas */}
        <div className="flex justify-center space-x-1 mt-4">
          {Array.from({ length: totalStars }).map((_, index) => {
            const currentRating = index + 1;
            return (
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onChange={() => setRating(currentRating)}
                  className="hidden"
                />
                <StarIcon
                  className={`w-8 h-8 transition-colors duration-200 ${
                    currentRating <= (hover ?? rating ?? 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => handleStarClick(currentRating)}
                />
              </label>
            );
          })}
        </div>

        {/* Mostrar etiquetas según el rating seleccionado */}
        {typeof rating === "number" && (
          <div className="mt-2">
            <h3 className="text-center text-gray-600 mb-3">
              Selecciona etiquetas:
            </h3>
            <div className="flex flex-wrap justify-center gap-1">
              {tagsByRating[rating]?.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold text-center transition-colors duration-200 
                    ${
                      selectedTags.includes(tag)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    } ${
                    selectedTags.length >= 2 && !selectedTags.includes(tag)
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-400"
                  }`}
                  onClick={() => toggleTag(tag)}
                  disabled={
                    selectedTags.length >= 2 && !selectedTags.includes(tag)
                  }
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-gray-500">Materia</h3>
          <select
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400 "
          >
            {professorMaterias.length > 0 ? (
              professorMaterias.map((materia: any) => (
                <option key={materia.id} value={materia.nombre}>
                  {(materia as any).nombre}
                </option>
              ))
            ) : (
              <option value="">No hay materias disponibles</option>
            )}
          </select>
        </div>

        <div className="mt-4">
          <h3 className="text-gray-500">Añadir un comentario (Opcional)</h3>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
          ></textarea>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-center transition-colors 
            duration-200 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleSubmit}
          >
            Enviar Calificación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCalificar;

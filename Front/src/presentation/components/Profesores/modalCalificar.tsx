// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // -------------------Componente de formulario para eliminar un usuario-------------------

// // eslint-disable-next-line react/prop-types
// const ModalEliminarUsuario = ({ closeModal, idProfessor }) => {

//   // -------------------Maneja el envío del formulario para eliminar el usuario-------------------
//   //   const handleSubmit = async (e) => {
//   //     e.preventDefault();
//   //     try {
//   //       await EliminarUsuario({
//   //         email,
//   //       });
//   //       closeModal();
//   //     } catch {
//   //       toast.error("Hubo un error al eliminar el usuario")
//   //     }
//   //   };

//   // -------------------Renderiza el Modal-------------------
//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="max-w-2xl w-full space-y-8 p-10 bg-white rounded-xl shadow-xl z-10 relative">
//         <form className="space-y-6" >
//             {/* onSubmit={handleSubmit} */}
//           <h1 className="text-center text-2xl font-bold text-gray-700">
//             Eliminar Usuario
//           </h1>

//           <div className="flex justify-center items-center h-full">
//             <div className="w-full sm:w-auto">
//               <p>{idProfessor}</p> {/* Mostrar el email del usuario seleccionado */}
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//             >
//               Eliminar Usuario
//             </button>
//           </div>
//         </form>
//         <button
//           className="absolute top-2 right-10 text-gray-400 hover:text-red-500 focus:outline-none"
//           onClick={closeModal}
//         >
//           <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ModalEliminarUsuario;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar } from "@fortawesome/free-solid-svg-icons";
import { StarIcon } from "@heroicons/react/24/solid";

const ModalCalificar = ({ closeModal, professorId, professorName }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);

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
          {[...Array(totalStars)].map((star, index) => {
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
                    currentRating <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(currentRating)}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalCalificar;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencil } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select"; // Select2 equivalent for React
import { updateMateria } from "@/domain/repositories/coursesRepository";

const ModalEditarMateria = ({ closeModal, Materia, onMateriaUpdated}) => {
  const [courseName, setCourseName] = useState(Materia.nombre || "");

  const handleSubmit = async () => {
    try {
      console.log("Enviando datos:", courseName);
      const response = await updateMateria(Materia.id, courseName);
      console.log("Materia actualizada:", response);
      onMateriaUpdated(response);
      closeModal();
    } catch (error) {
      console.error("Error actualizando la materia:", error);
    }
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

        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faPencil}
            className="text-blue-500 text-4xl mb-2"
          />
          <h2 className="text-center text-xl font-bold text-gray-700">
            Editar Materia
          </h2>

          {/* Name Field */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={courseName || ""}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border rounded p-2 mt-3"
            required
          />

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarMateria;

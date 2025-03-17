import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBookMedical } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select"; // Select2 equivalent for React
import { createCourse } from "@/domain/repositories/coursesRepository";

const ModalAgregarMateria = ({ closeModal, onMateriaAdded }) => {
  const [courseData, setCourseData] = useState({ nombre: "" });

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const formattedData = {
        nombre: courseData.nombre,
      };

      console.log("Enviando datos:", formattedData);
      const response = await createCourse(formattedData);
      console.log("Materia creada:", response);
      onMateriaAdded(response); 
      closeModal();
    } catch (error) {
      console.error("Error creando la materia:", error);
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
            icon={faBookMedical}
            className="text-blue-500 text-4xl mb-2"
          />
          <h2 className="text-center text-xl font-bold text-gray-700">
            Agregar Materia
          </h2>

          {/* Name Field */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={courseData.nombre}
            onChange={handleChange}
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
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarMateria;

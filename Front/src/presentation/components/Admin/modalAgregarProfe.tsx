import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select"; // Select2 equivalent for React
import { createProfessor } from "@/domain/repositories/professorRepository";
import { getCourses } from "@/domain/repositories/coursesRepository";

const ModalAgregarProfe = ({ closeModal, onProfessorAdded }) => {
  const [professorData, setProfessorData] = useState({
    correo: "",
    nombre: "",
    apellidos: "",
    materias: [""],
  });

  const [courses, setCourses] = useState([]); // State for courses list

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            const formattedCourses = data.map(course => ({
                value: course.id,  // Asegurar que `value` sea `id`
                label: course.nombre,  // `label` es el nombre del curso
            }));
            setCourses(formattedCourses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };
    fetchCourses();
}, []);

  const handleChange = (e) => {
    setProfessorData({
      ...professorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectsChange = (selectedOptions) => {
    setProfessorData({
        ...professorData,
        materias: selectedOptions.map(option => ({
            id: option.value,  // El value en Select representa el id
            nombre: option.label,  // El label representa el nombre
        }))
    });
};

const handleSubmit = async () => {
  try {
      const formattedData = {
          correo: professorData.correo,
          nombre: professorData.nombre,
          apellidos: professorData.apellidos,
          materias: professorData.materias // Ahora ya tiene `{ id, nombre }`
      };

      console.log("Enviando datos:", formattedData);
      
      const response = await createProfessor(formattedData);
      console.log("Profesor creado:", response);
      onProfessorAdded(response); // Actualizar el estado del padre si es necesario
      closeModal();
  } catch (error) {
      console.error("Error creando profesor:", error);
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
          <FontAwesomeIcon icon={faUserPlus} className="text-blue-500 text-4xl mb-2" />
          <h2 className="text-center text-xl font-bold text-gray-700">Agregar Profesor</h2>

          {/* Email Field */}
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={professorData.correo}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-3"
            required
          />

          {/* Name Field */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={professorData.nombre}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-3"
            required
          />

          {/* Last Name Field */}
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={professorData.apellidos}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-3"
            required
          />

          {/* Select2 for Subjects */}
          <div className="w-full mt-3">
            <Select
              isMulti
              options={courses}
              onChange={handleSubjectsChange}
              placeholder="Selecciona materias"
              className="border rounded"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={closeModal}>
              Cancelar
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSubmit}>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarProfe;

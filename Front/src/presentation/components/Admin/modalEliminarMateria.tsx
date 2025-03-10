import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const ModalEliminarProfe = ({ closeModal, confirmDelete, materiaName }) => {
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
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-4xl mb-2" />
          <h2 className="text-center text-xl font-bold text-gray-700">
            ¿Estás seguro de eliminar esta materia?
          </h2>
          <p className="text-center text-lg font-semibold text-red-500">{materiaName}</p>

          <div className="flex space-x-4 mt-6">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={confirmDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminarProfe;

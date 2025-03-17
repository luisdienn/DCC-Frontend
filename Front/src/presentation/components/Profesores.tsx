import { useEffect, useState } from "react";
import { getProfessors } from "@/domain/repositories/professorRepository";
import { Button } from "flowbite-react";
import { FaEnvelope, FaUniversity, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

type Professor = {
  nombre: string;
  apellidos: string;
  correo: string;
  fecha_creacion: string;
  id: string;
  materias: { id: string; nombre: string }[];
  universidad: string;
};

const Profesores = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Paginación
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(9); // Cantidad de elementos por página

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await getProfessors();
        const formattedData = data.map((prof: any) => ({
          id: prof.id,
          nombre: prof.nombre,
          apellidos: prof.apellidos,
          correo: prof.correo,
          fecha_creacion: prof.fecha_creacion,
          materias: prof.materias,
          universidad: prof.universidad,
        }));

        setProfessors(formattedData);
      } catch (err) {
        console.error("Error al obtener los profesores:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  // Calcular los profesores de la página actual
  const paginatedProfessors = professors.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // Cambiar de página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < Math.ceil(professors.length / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <main className="w-full min-h-screen dark:bg-gray-900 bg-white">
      <section className="relative w-full p-4 bg-gradient-to-r from-blue-300 to-indigo-500 dark:from-blue-700 dark:to-indigo-800">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full top-10 left-16 dark:bg-gray-600"></div>
          <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-20 right-20 dark:bg-gray-600"></div>
        </div>

        <h1 className="pt-28 text-3xl text-white font-bold text-center mb-6 dark:text-white">
          Profesores
        </h1>
      </section>

      <div className="max-w-7xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-center text-lg text-gray-400 dark:text-gray-300">
            Cargando Profesores...
          </p>
        ) : (
          paginatedProfessors.map((professor) => (
            <div
              key={professor.id}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform min-h-[350px] flex flex-col"
            >
              <h2 className="text-2xl font-semibold text-blue-400 dark:text-blue-300">
                {professor.nombre} {professor.apellidos}
              </h2>
              <div className="mt-2 text-sm flex items-center">
                <FaEnvelope className="mr-2 text-gray-400 dark:text-gray-300" />
                <p>{professor.correo}</p>
              </div>
              <div className="mt-2 text-sm flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-400 dark:text-gray-300" />
                <strong>Fecha de Creación:</strong>{" "}
                {new Date(professor.fecha_creacion).toLocaleDateString()}
              </div>
              <div className="mt-2 text-sm flex items-center">
                <FaUniversity className="mr-2 text-gray-400 dark:text-gray-300" />
                <strong>Universidad: </strong> {professor.universidad}
              </div>

              <div className="mt-4 flex-1">
                <strong className="text-blue-400 dark:text-blue-300">
                  Materias:
                </strong>
                <div className="flex flex-wrap mt-2">
                  {professor.materias.map((materia) => (
                    <span
                      key={materia.id}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full mr-2 mb-2 text-sm dark:bg-blue-500"
                    >
                      {materia.nombre}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Link href={`/reviewProfesor?id=${professor.id}`} passHref>
                  <Button
                    color="light"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-400 dark:hover:bg-yellow-500"
                  >
                    Ver Profesor
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center mt-6 pb-20">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="bg-blue-500 text-white mr-4 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Anterior
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={(currentPage + 1) * pageSize >= professors.length}
          className="bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Siguiente
        </Button>
      </div>
    </main>
  );
};

export default Profesores;

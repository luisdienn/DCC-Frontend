import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  deleteCourse,
  getCourseById,
  getCourses,
} from "@/domain/repositories/coursesRepository";
import { useRouter } from "next/router";
import ModalEliminarMateria from "./modalEliminarMateria";
import ModalAgregarMateria from "./modalAgregarMateria";
import ModalEditarMateria from "./modalEditarMateria";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";

type Course = {
  nombre: string;
  id: string;
};

const MateriaAdmin = () => {
  const [materias, setMaterias] = useState<Course[]>([]);
  const [materia, setMateria] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState<Course | null>(null);
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditarMateriaOpen, setIsEditarMateriaOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();

        const formattedData = data.map((course: any) => ({
          id: course.id,
          nombre: course.nombre,
        }));

        setMaterias(formattedData);
      } catch (err) {
        console.error("Error al obtener las materias:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = async (id: string) => {
    try {
      console.log("Editando la materia con ID:", id);
      const data = await getCourseById(id);

      setSelectedMateria(data);
      console.log("Materia seleccionado:", data);
      openEditarMateriaModal();
    } catch (err) {
      console.error("Error al obtener la materia:", err);
    }
  };

  const handleDeleteClick = (course: Course) => {
    setSelectedMateria(course);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMateria) return;
    try {
      console.log("Eliminando materia con ID:", selectedMateria.id);
      await deleteCourse(selectedMateria.id);
      setMaterias((prev) => prev.filter((p) => p.id !== selectedMateria.id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error al borrar la materia:", err);
    }
  };

  const handleAddMateriaClick = () => {
    setShowAddModal(true);
  };

  const handleMateriaAdded = (newCourse) => {
    setMaterias([...materias, { id: newCourse.id, ...newCourse }]);
  };

  // --------- MODAL EDITAR MATERIA --------- //
  const openEditarMateriaModal = () => {
    setIsEditarMateriaOpen(true);
  };
  const closeEditarMateriaModal = () => {
    setIsEditarMateriaOpen(false);
  };

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre de la Materia",
        size: 250,
      },
      {
        accessorKey: "acciones",
        header: "Acciones",
        size: 250,
        muiTableHeadCellProps: { sx: { textAlign: "right", pl: 75 } },
        muiTableBodyCellProps: { sx: { textAlign: "right", pr: 0 } },
        Cell: ({ row }) => (
          <div className="flex justify-end md:pr-24 space-x-2">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => handleEdit(row.original.id)}
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              onClick={() => handleDeleteClick(row.original)}
            >
              Borrar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: materias,
  });

  return (
    <main className=" items-center w-full bg-gray-100">
      <section className="relative w-full md:h-[34vh] h-[20vh] p-4 bg-gradient-to-r from-blue-300 to-indigo-500">
        {/* Círculos decorativos */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full top-10 left-16"></div>
          <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-20 right-20"></div>
        </div>

        <h1 className="pt-28 text-3xl text-white font-bold text-center mb-6">
          MATERIAS
        </h1>
        <div className="flex justify-center">
          <button
            type="button"
            className=" flex justify-center  z-10 items-center mb-6 bg-white text-black border-black border- w-10 h-10 rounded-full hover:bg-green-600 transition duration-200 shadow-lg"
            onClick={handleAddMateriaClick}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Contenedor de la tabla */}
      <div className="max-w-10xl w-full max-w-6xl justify-center text-center mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="text-center text-lg text-gray-600">
            Cargando Materias...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <MaterialReactTable table={table} />
          </div>
        )}
      </div>

      {showDeleteModal && selectedMateria && (
        <ModalEliminarMateria
          closeModal={() => setShowDeleteModal(false)}
          confirmDelete={handleDeleteConfirm}
          materiaName={`${selectedMateria.nombre}`}
        />
      )}

      {showAddModal && (
        <ModalAgregarMateria
          closeModal={() => setShowAddModal(false)}
          onMateriaAdded={handleMateriaAdded}
        />
      )}

      {isEditarMateriaOpen && (
        <ModalEditarMateria
          closeModal={closeEditarMateriaModal}
          Materia={selectedMateria}
        />
      )}
    </main>
  );
};

export default MateriaAdmin;

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
import ModalEliminarMateria from "./modalEliminarMateria";
import ModalAgregarMateria from "./modalAgregarMateria";
import ModalEditarMateria from "./modalEditarMateria";
import { PlusIcon } from "@heroicons/react/24/solid";

type Course = { nombre: string; id: string };

const MateriaAdmin = () => {
  const [materias, setMaterias] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState<Course | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditarOpen, setIsEditarOpen] = useState(false);

  // Fetch materias
  useEffect(() => {
    (async () => {
      try {
        const data = await getCourses();
        setMaterias(data.map((c: any) => ({ id: c.id, nombre: c.nombre })));
      } catch (err) {
        console.error("Error al obtener las materias:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Handlers
  const handleEdit = async (id: string) => {
    try {
      const data = await getCourseById(id);
      setSelectedMateria(data);
      setIsEditarOpen(true);
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
      await deleteCourse(selectedMateria.id);
      setMaterias(prev => prev.filter(m => m.id !== selectedMateria.id));
    } catch (err) {
      console.error("Error al borrar la materia:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };
  const handleAddMateriaClick = () => setShowAddModal(true);
  const onMateriaAdded = async () => {
    setIsLoading(true);
    await getCourses()
      .then(data => setMaterias(data.map((c: any) => ({ id: c.id, nombre: c.nombre }))));
    setIsLoading(false);
  };
  const onMateriaUpdated = onMateriaAdded;

  // Columns
  const columns = useMemo<MRT_ColumnDef<Course>[]>(
  () => [
    {
      accessorKey: "nombre",
      header: "Nombre de la Materia",
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      enableSorting: false,
      enableColumnActions: false,
      muiTableHeadCellProps: { align: "right", sx: { pr: 6.5 } },
      muiTableBodyCellProps: { align: "right"},
      Cell: ({ row }) => (
        <div className="flex w-full justify-end items-center space-x-2">
          <button
            type="button"
            className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleEdit(row.original.id)}
          >
            Editar
          </button>
          <button
            type="button"
            className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
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

  // Table instance
  const table = useMaterialReactTable({ columns, data: materias });

  return (
    <main className="flex flex-col items-center w-full bg-gray-100">
      {/* Header */}
      <section className="relative w-full h-[20vh] md:h-[34vh] p-4 bg-gradient-to-r from-blue-300 to-indigo-500">
        {/* Círculos decorativos solo en md+ */}
        <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none">
          <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full top-10 left-16"></div>
          <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-20 right-20"></div>
        </div>
        <h1 className="pt-20 md:pt-28 text-2xl md:text-3xl text-white font-bold text-center mb-4">
          MATERIAS
        </h1>
        <div className="flex justify-center">
          <button
            type="button"
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white text-black border border-white rounded-full hover:bg-green-600 hover:border-green-600 transition duration-200 shadow-lg"
            onClick={handleAddMateriaClick}
          >
            <PlusIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </section>

      {/* Tabla */}
      <div className="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 overflow-x-auto">
        {isLoading ? (
          <p className="text-center text-lg text-gray-600">Cargando Materias...</p>
        ) : (
          <MaterialReactTable table={table} />
        )}
      </div>

      {/* Modales */}
      {showDeleteModal && selectedMateria && (
        <ModalEliminarMateria
          closeModal={() => setShowDeleteModal(false)}
          confirmDelete={handleDeleteConfirm}
          materiaName={selectedMateria.nombre}
        />
      )}
      {showAddModal && (
        <ModalAgregarMateria
          closeModal={() => setShowAddModal(false)}
          onMateriaAdded={onMateriaAdded}
        />
      )}
      {isEditarOpen && selectedMateria && (
        <ModalEditarMateria
          closeModal={() => setIsEditarOpen(false)}
          Materia={selectedMateria}
          onMateriaUpdated={onMateriaUpdated}
        />
      )}
    </main>
  );
};

export default MateriaAdmin;

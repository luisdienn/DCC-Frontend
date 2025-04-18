import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  deleteProfessor,
  getProfessorById,
  getProfessors
} from "@/domain/repositories/professorRepository";
import { useRouter } from "next/router";
import ModalEliminarProfe from "./modalEliminarProfe";
import ModalAgregarProfe from "./modalAgregarProfe";
import ModalEditarProfe from "./modalEditarProfe";
import { PlusIcon } from "@heroicons/react/24/solid";

type Person = {
  nombre: string;
  apellidos: string;
  correo: string;
  materias: string;
  id: string;
};

const ProfeAdmin = () => {
  const [professors, setProfessors] = useState<Person[]>([]);
  const [professor, setProfessor] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<Person | null>(null);
  const router = useRouter();




  const fetchProfessors = async () => {
    try {
      const data = await getProfessors();

      const formattedData = data.map((prof: any) => ({
        id: prof.id,
        nombre: prof.nombre,
        apellidos: prof.apellidos,
        correo: prof.correo,
        materias: prof.materias.map((materia:any) => materia.nombre).join(", "),
      }));

      setProfessors(formattedData);
    } catch (err) {
      console.error("Error al obtener los profesores:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleEdit = async (id: string) => {
    try {
      console.log("Editando profesor con ID:", id);
      const data = await getProfessorById(id);

      setSelectedProfessor(data);
      setShowEditModal(true);
    } catch (err) {
      console.error("Error al obtener el profesor:", err);
    }
  };

  const handleDeleteClick = (prof: Person) => {
    setSelectedProfessor(prof);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProfessor) return;
    try {
      console.log("Eliminando profesor con ID:", selectedProfessor.id);
      await deleteProfessor(selectedProfessor.id);
      setProfessors((prev) =>
        prev.filter((p) => p.id !== selectedProfessor.id)
      );
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error al borrar el profesor:", err);
    }
  };

  const handleAddProfessorClick = () => {
    setShowAddModal(true);
  };

const  handleProfessorAdded = async () => {
  await fetchProfessors();
};

const handleProfessorUpdated = async() => {
    await fetchProfessors();
};

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 150,
    },
    {
      accessorKey: "apellidos",
      header: "Apellidos",
      size: 150,
    },
    {
      accessorKey: "correo",
      header: "Correo",
      size: 200,
    },
    {
      accessorKey: "materias",
      header: "Materias",
      size: 200,
    },
    {
      accessorKey: "editar",
      header: "Acciones",
      size: 200,
      Cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => handleEdit(row.original.id)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => handleDeleteClick(row.original)}
          >
            Borrar
          </button>
        </div>
      ),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: professors,
  });

  return (
    <main className=" items-center w-full bg-gray-100">
      {/* <h1 className="pt-28 text-3xl font-bold text-center mb-6">PROFESORES</h1>

      <div className="flex justify-center">
        <button
          className=" flex justify-center items-center mb-6 bg-white text-black border-black border- w-10 h-10 rounded-full hover:bg-green-600 transition duration-200 shadow-lg"
          onClick={handleAddProfessorClick}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
      */}

      <section className="relative w-full md:h-[34vh] h-[20vh] p-4 bg-gradient-to-r from-blue-300 to-indigo-500">
        {/* Círculos decorativos */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full top-10 left-16"></div>
          <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-20 right-20"></div>
        </div>

        <h1 className="pt-28 text-3xl text-white font-bold text-center mb-6">
          PROFESORES
        </h1>
        <div className="flex justify-center">
          <button
            type="button"
            className=" flex justify-center  z-10 items-center mb-6 bg-white text-black border-black border- w-10 h-10 rounded-full hover:bg-green-600 transition duration-200 shadow-lg"
            onClick={handleAddProfessorClick}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </section>

      <div className="max-w-10xl w-full  justify-center text-center mx-auto p-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="text-center text-lg">Cargando profesores...</p>
        ) : (
          <MaterialReactTable table={table} />
        )}
      </div>
      {showDeleteModal && selectedProfessor && (
        <ModalEliminarProfe
          closeModal={() => setShowDeleteModal(false)}
          confirmDelete={handleDeleteConfirm}
          professorName={`${selectedProfessor.nombre} ${selectedProfessor.apellidos}`}
        />
      )}

      {showAddModal && (
        <ModalAgregarProfe
          closeModal={() => setShowAddModal(false)}
          onProfessorAdded={handleProfessorAdded}
        />
      )}

      {showEditModal && selectedProfessor && (
        <ModalEditarProfe
          professor={selectedProfessor}
          closeModal={() => setShowEditModal(false)}
          onProfessorUpdated={handleProfessorUpdated}
        />
      )}
    </main>
  );
};

export default ProfeAdmin;

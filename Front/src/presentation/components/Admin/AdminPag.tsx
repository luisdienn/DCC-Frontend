"use client";

import { Button, Card } from "flowbite-react";

export function AdminPag() {
  return (
    <div className="min-h-screen min-w-full flex flex-col items-center justify-center bg-[#fdfefe] dark:bg-[#002855]">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Carta de Materias */}
        <Card className=" border-hidden max-w-sm flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow bg-[#fdfefe] dark:bg-[#001955] ">
          <img
            src="https://images.vexels.com/media/users/3/128313/isolated/preview/01fb3e375286d98cbc46c50e917db249-icono-plano-de-cuaderno.png"
            alt="Icono de Materias"
            className="w-40 h-40 mx-auto"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
            MATERIAS
          </h5>
          <p className="font-normal text-gray-400 pb-4">
            En este apartado vas a poder crear, modificar y eliminar materias.
          </p>
          <Button className="border-neutral-950 dark:border-white text-gray-900 dark:text-white mt-2">
            Ir a materias
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>

        {/* Carta de Profesores */}
        <Card className=" border-hidden max-w-sm flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow bg-[#fdfefe] dark:bg-[#001955]">
          <img
            src="https://images.vexels.com/media/users/3/128876/isolated/preview/64675632e71d2e19ad09b5797b07ae59-profesion-docente-cartoon-svg.png"
            alt="Icono de Profesores"
            className="w-40 h-40 mx-auto"
          />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
            PROFESORES
          </h5>
          <p className="font-normal text-gray-400 pb-4">
            En este apartado vas a poder crear, modificar y eliminar profesores.
          </p>
          <Button className=" border-neutral-950 dark:border-white text-gray-900 dark:text-white mt-2">
            Ir a profesores
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
      </div>
    </div>
  );
}

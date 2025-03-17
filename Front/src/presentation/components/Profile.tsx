"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faStar, faComments } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  const userProfileImage = session?.user?.image || "https://randomuser.me/api/portraits/women/43.jpg";
  const userName = session?.user?.name || "Usuario Desconocido";
  const userEmail = session?.user?.email || "No disponible";

  return (
      <main className="profile-page bg-[#fdfefe] dark:bg-gray-900 min-h-screen">
        {/* Sección de Portada */}
        <section className="relative w-full p-4 bg-gradient-to-r from-blue-400 to-blue-700 dark:from-gray-900 dark:to-gray-900">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full top-10 left-16 dark:bg-gray-600"></div>
            <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full top-20 right-20 dark:bg-gray-600"></div>
          </div>
          <h1 className="pt-28 text-3xl text-white font-bold text-center mb-6">
            Perfil de Usuario
          </h1>
        </section>

        {/* Sección de Perfil */}
        <section className="relative py-16 mt-36">
          <div className="container mx-auto px-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 text-center -mt-40 sm:-mt-48">
              {/* Imagen de Perfil */}
              <div className="relative w-44 h-44 mx-auto mb-4 sm:w-32 sm:h-32">
                <Image
                    alt="Perfil"
                    src={userProfileImage}
                    width={176}
                    height={176}
                    className="shadow-xl rounded-full border-4 border-white dark:border-gray-700"
                />
              </div>

              {/* Información del Usuario */}
              <h3 className="text-3xl font-semibold text-[#002855] dark:text-white">
                {userName}
              </h3>
              <p className="text-lg text-blue-400 dark:text-blue-300 mt-2">
                {userEmail}
              </p>
              <p className="text-lg text-[#002855] dark:text-white mt-2 font-medium">
                Estudiante
              </p>

              {/* Universidad */}
              <div className="mt-4 text-blue-400 dark:text-blue-300 text-lg">
                <p>
                  <FontAwesomeIcon icon={faUniversity} className="mr-2" /> Universidad Cenfotec
                </p>
              </div>

              {/* Calificaciones y Comentarios */}
              <div className="flex flex-wrap justify-center space-x-6 mt-8">

                {/* Calificaciones */}
                <div className="p-6 bg-[#fdfefe] dark:bg-blue-700 rounded-xl shadow-md w-48 text-center">
                  <span className="text-3xl font-bold text-[#002855] dark:text-white">0</span>
                  <div className="text-md text-blue-400 dark:text-blue-300 flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faStar} className="mr-2"/> Calificaciones
                  </div>
                </div>

                {/* Comentarios */}
                <div className="p-6 bg-[#fdfefe] dark:bg-blue-700 rounded-xl shadow-md w-48 text-center">
                  <span className="text-3xl font-bold text-[#002855] dark:text-white">0</span>
                  <div className="text-md text-blue-400 dark:text-blue-300 flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faComments} className="mr-2"/> Respuestas
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 py-6 border-t border-blue-400 dark:border-blue-300">
                <p className="text-lg text-[#002855] dark:text-white font-medium">
                  Perfil creado el {new Date("02/02/2024").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
};

export default Profile;

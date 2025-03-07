"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity, faStar, faComments } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  return (
    <main className="profile-page">
      {/* Sección de Portada */}
      <section className="relative block h-60 sm:h-80">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16 sm:h-20">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 2560 100"
          >
            <polygon className="text-[#003366] dark:text-[#002855] fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>

      {/* Sección de Perfil */}
      <section className="relative py-20 bg-[#fdfefe] dark:bg-[#002855]">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-[#003366] w-full mb-6 shadow-xl rounded-lg -mt-40 sm:-mt-48">
            <div className="px-8 flex flex-col items-center text-center">
              {/* Imagen de Perfil */}
              <div className="relative w-44 h-44 mb-6">
                <Image
                  alt="Perfil"
                  src="https://randomuser.me/api/portraits/women/43.jpg"
                  layout="fill"
                  objectFit="cover"
                  className="shadow-xl rounded-full border-4 border-white dark:border-[#002855]"
                />
              </div>

              {/* Información del Usuario */}
              <h3 className="text-3xl font-semibold text-[#003366] dark:text-[#e4e4e6]">Ana Morales</h3>
              <p className="text-lg text-[#006aea] dark:text-[#cbd5e1] mt-2">Ejemplo@ucenfotec.ac.cr</p>
              <p className="text-lg text-[#003366] dark:text-[#e4e4e6] mt-2 font-medium">Estudiante</p>

              {/* Universidad */}
              <div className="mt-4 text-[#006aea] dark:text-[#cbd5e1] text-lg">
                <p>
                  <FontAwesomeIcon icon={faUniversity} className="mr-2" />
                  Universidad Cenfotec
                </p>
              </div>

              {/* Calificaciones y Comentarios */}
              <div className="flex justify-center space-x-8 mt-8">
                {/* Calificaciones */}
                <div className="p-5 bg-[#e4e4e6] dark:bg-[#00479b] rounded-xl shadow-md w-40">
                  <span className="text-3xl font-bold text-[#003366] dark:text-[#e4e4e6]">5</span>
                  <div className="text-md text-[#006aea] dark:text-[#cbd5e1] flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faStar} className="mr-2" /> Calificaciones
                  </div>
                </div>

                {/* Comentarios */}
                <div className="p-5 bg-[#e4e4e6] dark:bg-[#00479b] rounded-xl shadow-md w-40">
                  <span className="text-3xl font-bold text-[#003366] dark:text-[#e4e4e6]">10</span>
                  <div className="text-md text-[#006aea] dark:text-[#cbd5e1] flex items-center justify-center mt-2">
                    <FontAwesomeIcon icon={faComments} className="mr-2" /> Respuestas
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 py-6 border-t border-[#006aea] dark:border-[#cbd5e1] w-full text-center">
                <p className="text-lg text-[#003366] dark:text-[#e4e4e6] font-medium">
                  Perfil creado el {new Date("02/02/2024").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;

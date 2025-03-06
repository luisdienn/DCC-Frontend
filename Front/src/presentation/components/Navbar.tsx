"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faUser, faComments, faCog, faSignOutAlt, faMoon, faSun,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useNavbar } from "@/application/hooks/useNavbar";

const Navbar = () => {
  const pathname = usePathname();
  const {
    isAuthenticated,
    isMenuOpenDesktop,
    setIsMenuOpenDesktop,
    isMenuOpenMobile,
    setIsMenuOpenMobile,
    isDarkMode,
    toggleDarkMode,
    menuRefDesktop,
    menuRefMobile,
  } = useNavbar();

  const userProfileImage = "https://randomuser.me/api/portraits/men/43.jpg";

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => pathname === path ? "text-[#006aea] font-bold dark:text-white" : "text-[#00479b] dark:text-[#e4e4e6]";

  return (
    <>
      <nav className="bg-[#fdfefe] dark:bg-[#00479b] shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="h-6 mr-2" />
              <span className="text-xl font-semibold text-[#00479b] dark:text-[#e4e4e6]">Nombre</span>
            </Link>


            <div className="hidden md:flex items-center space-x-6">
              <Link href="/inicio" className={`${isActive("/inicio")} hover:text-[#006aea] transition`}>
                Inicio
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/profesores" className={`${isActive("/profesores")} hover:text-[#006aea] transition`}>
                    Profesores
                  </Link>
                  <Link href="/foro" className={`${isActive("/foro")} hover:text-[#006aea] transition`}>
                    Foro
                  </Link>

                  <div className="relative" ref={menuRefDesktop}>
                    <Image
                      src={userProfileImage}
                      alt="Foto de perfil"
                      width={50}
                      height={50}
                      className="rounded-full cursor-pointer"
                      onClick={() => setIsMenuOpenDesktop(prev => !prev)}
                    />

                    {isMenuOpenDesktop && (
                      <div className="absolute right-0 mt-2 w-56 bg-[#fdfefe] dark:bg-[#00479b] rounded-lg shadow-lg overflow-hidden">
                        <Link href="/perfil" className={`block px-6 py-3 ${isActive("/perfil")} hover:bg-[#e4e4e6] dark:hover:bg-[#006aea] flex items-center`}>
                          <FontAwesomeIcon icon={faUser} className="mr-3" />
                          Perfil
                        </Link>
                        <button className="block w-full text-left px-6 py-3 text-[#00479b] dark:text-[#e4e4e6] hover:bg-[#e4e4e6] dark:hover:bg-[#006aea] flex items-center" onClick={() => console.log("Cerrar sesión")}>
                          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                          Cerrar sesión
                        </button>
                        <div className="border-t border-[#e4e4e6] dark:border-gray-600"></div>
                        <button className="block w-full text-left px-6 py-3 text-[#00479b] dark:text-[#e4e4e6] hover:bg-[#e4e4e6] dark:hover:bg-[#006aea] flex items-center" onClick={toggleDarkMode}>
                          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="mr-3" />
                          {isDarkMode ? "Modo claro" : "Modo oscuro"}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="md:hidden relative" ref={menuRefMobile}>
              {isAuthenticated ? (
                <>
                  <Image
                    src="https://randomuser.me/api/portraits/men/43.jpg"
                    alt="Perfil"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    onClick={() => setIsMenuOpenMobile(prev => !prev)}
                  />
                  {isMenuOpenMobile && (
                    <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-[#00479b] rounded-lg shadow-lg overflow-hidden">
                      <Link href="/perfil" className="block px-4 py-2 text-[#006aea] dark:text-white hover:bg-gray-100 dark:hover:bg-[#006aea] flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-2" /> Perfil
                      </Link>
                      <button className="block w-full px-4 py-2 text-[#006aea] dark:text-white hover:bg-gray-100 dark:hover:bg-[#006aea] flex items-center">
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />Cerrar sesión
                      </button>
                      <div className="border-t dark:border-gray-600"></div>
                      <button className="block w-full px-4 py-2 text-[#006aea] dark:text-white hover:bg-gray-100 dark:hover:bg-[#006aea] flex items-center" onClick={toggleDarkMode}>
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="mr-2" />
                        {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button className="flex items-center px-4 py-2 border rounded-md shadow-md text-black dark:bg-white">
                  <Image
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Ingresar con Google
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar Móvil */}

      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-[#00479b] shadow-md border-t">
        {isAuthenticated ? (
          <div className="flex justify-around py-3">
            <Link href="/inicio" className={`flex flex-col items-center ${isActive("/inicio")}`}>
              <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
              <span className="text-sm">Inicio</span>
            </Link>
            <Link href="/profesores" className={`flex flex-col items-center ${isActive("/profesores")}`}>
              <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
              <span className="text-sm">Profesores</span>
            </Link>
            <Link href="/foro" className={`flex flex-col items-center ${isActive("/foro")}`}>
              <FontAwesomeIcon icon={faComments} className="w-6 h-6" />
              <span className="text-sm">Foro</span>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center py-3">
            <Link href="/inicio" className={`flex flex-col items-center ${isActive("/inicio")}`}>
              <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
              <span className="text-sm">Inicio</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

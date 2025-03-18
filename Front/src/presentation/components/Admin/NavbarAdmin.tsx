/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useNavbar } from "@/application/hooks/useNavbar";

const NavbarAdmin = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const {
    isMenuOpenDesktop,
    setIsMenuOpenDesktop,
    isMenuOpenMobile,
    setIsMenuOpenMobile,
    isDarkMode,
    toggleDarkMode,
    menuRefDesktop,
    menuRefMobile,
  } = useNavbar();

  const isAuthenticated = !!session;
  const userProfileImage = session?.user?.image ? session.user.image : "https://randomuser.me/api/portraits/men/43.jpg";

  // Función para determinar si un enlace está activo
  const isActive = (path: string) =>
    pathname === path ? "text-[#006aea] font-bold dark:text-white" : "text-[#00479b] dark:text-[#e4e4e6]";

  return (
    <nav className="bg-[#fdfefe] dark:bg-[#00479b] shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 📌 LOGO ADMINISTRADOR */}
          <Link href="/admin" className="flex items-center">
            <img src="/CenfoScore.png" alt="Logo" className="h-12 mr-2" />
            <span className="text-xl font-semibold text-[#00479b] dark:text-[#e4e4e6]">Administrador</span>
          </Link>

          {/* 📌 MENÚ DESKTOP */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
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
                    <button
                      className="block w-full text-left px-6 py-3 text-[#00479b] dark:text-[#e4e4e6] hover:bg-[#e4e4e6] dark:hover:bg-[#006aea] flex items-center"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                      Cerrar sesión
                    </button>
                    <div className="border-t border-[#e4e4e6] dark:border-gray-600"></div>
                    <button
                      className="block w-full text-left px-6 py-3 text-[#00479b] dark:text-[#e4e4e6] hover:bg-[#e4e4e6] dark:hover:bg-[#006aea] flex items-center"
                      onClick={toggleDarkMode}
                    >
                      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="mr-3" />
                      {isDarkMode ? "Modo claro" : "Modo oscuro"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 📌 MENÚ MÓVIL */}
          <div className="md:hidden relative" ref={menuRefMobile}>
            {isAuthenticated ? (
              <>
                <Image
                  src={userProfileImage}
                  alt="Perfil"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  onClick={() => setIsMenuOpenMobile(prev => !prev)}
                />
                {isMenuOpenMobile && (
                  <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-[#00479b] rounded-lg shadow-lg overflow-hidden">
                    <button
                      className="block w-full px-4 py-2 text-[#006aea] dark:text-white hover:bg-gray-100 dark:hover:bg-[#006aea] flex items-center"
                      onClick={() => signOut()}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                      Cerrar sesión
                    </button>
                    <div className="border-t dark:border-gray-600"></div>
                    <button
                      className="block w-full px-4 py-2 text-[#006aea] dark:text-white hover:bg-gray-100 dark:hover:bg-[#006aea] flex items-center"
                      onClick={toggleDarkMode}
                    >
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
  );
};

export default NavbarAdmin;

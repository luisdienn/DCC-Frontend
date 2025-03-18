"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ Evitar que la pantalla de Login sea visible si ya está autenticado
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const destination =
        session.user.email === "ehidalgoh@ucenfotec.ac.cr"
          ? "/admin"
          : "/Profesores";

      router.replace(destination);
    }
  }, [status, session, router]);

  // ✅ Mostrar solo un loading mientras se obtiene la sesión para evitar flickering
  if (status === "loading") {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#fdfefe] dark:bg-[#002855]">

      </main>
    );
  }

  // ✅ No mostrar el formulario si ya está autenticado (evita el salto de login → auth → login)
  if (status === "authenticated") {
    return null; // El usuario será redirigido antes de ver esta pantalla
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#fdfefe] dark:bg-[#002855]">
      <div className="bg-white dark:bg-[#003366] shadow-xl rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-semibold text-[#003366] dark:text-[#e4e4e6] mt-4">
          Iniciar Sesión
        </h2>

        <form className="mt-6">
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-[#006aea] dark:bg-[#00479b] text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-[#00479b] dark:hover:bg-[#006aea] transition"
          >
            Iniciar Sesión con Google
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;

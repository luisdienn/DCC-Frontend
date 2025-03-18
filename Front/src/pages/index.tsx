import React from "react";
import Head from "next/head";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Calificaciones de Profesores</title>
        <meta
          name="description"
          content="Consulta las calificaciones y opiniones de profesores de diversas materias."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className="bg-gray-50 text-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="text-center py-7 bg-blue-600 text-white">
          <img src="CenfoScore.png" alt="Logo" className="h-44 mx-auto" />
          <h1 className="text-5xl font-bold">
            Consulta las Calificaciones de tus Profesores
          </h1>
          <p className="text-lg mt-4">
            Conoce las opiniones y puntuaciones de los profesores antes de tomar
            su clase.
          </p>
          <Link href="/login">
            <button className="mt-6 inline-block px-8 py-3 bg-yellow-500 text-lg font-semibold rounded-lg hover:bg-yellow-600 transition">
              Ingresar
            </button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8">¿Por qué elegirnos?</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 bg-gray-100 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Opiniones Reales
                </h3>
                <p>
                  Lee comentarios de estudiantes que ya han tomado clases con
                  los profesores. Opiniones verídicas y sin censura.
                </p>
              </div>
              <div className="p-8 bg-gray-100 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Mejores Decisiones
                </h3>
                <p>
                  Tomar decisiones informadas sobre qué profesores tomar. ¡Tu
                  tiempo es importante!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-blue-600 text-white py-12 text-center">
          <h2 className="text-3xl font-semibold">
            ¿Estás listo para conocer a tu próximo profesor?
          </h2>
          <Link href="/login">
            <button className="mt-6 inline-block px-8 py-3 bg-yellow-500 text-lg font-semibold rounded-lg hover:bg-yellow-600 transition">
              Buscar Profesores
            </button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>© 2025 Codify. Todos los derechos reservados.</p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;

import React from "react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Página no encontrada
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Lo sentimos, la página que buscas no se pudo encontrar.
      </p>
      <Link href="/pets" legacyBehavior>
        <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Página Principal
        </a>
      </Link>
    </div>
  );
}

export default NotFound;

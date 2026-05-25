import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-gradient-to-r from-gray-700 via-gray-900 to-black p-6 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
      <p className="text-lg mb-6">Lo sentimos, la página que buscas no existe.</p>
      <Link href="/productos" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Volver a productos
      </Link>
    </main>
  );
}   

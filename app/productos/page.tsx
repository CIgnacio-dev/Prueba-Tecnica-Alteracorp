"use client";
import { productos } from "@/lib/mocks/products";
import { useState } from "react";

export default function ProductosPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalPages = Math.ceil(productos.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = productos.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img
              src={product.imagen}
              alt={`Imagen de ${product.nombre}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="font-semibold text-lg">{product.nombre}</h2>

            <p className="text-sm text-gray-500">SKU: {product.sku}</p>

            <p className="mt-2 capitalize">{product.categoria}</p>

            <p className="font-bold text-xl mt-2">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(product.precio)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-8">
        <button
          onClick={() =>
            setCurrentPage((prev: number) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="mx-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}

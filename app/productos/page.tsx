"use client";
import { productos } from "@/lib/mocks/products";
import { useEffect, useState } from "react";
import { ProductCard } from "@/src/components/products/product-card";
import { useDebounce } from "@/lib/hooks/use-debounce";

export default function ProductosPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const debouncedSearch = useDebounce(search, 300);

  const filteredProducts = productos.filter((product) =>
    product.nombre.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
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

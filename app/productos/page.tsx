"use client";
import { productos } from "@/lib/mocks/products";
import { useEffect, useState } from "react";
import { ProductCard } from "@/src/components/products/product-card";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductosPage() {
  

  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || Number(1));
  const [category, setCategory] = useState(searchParams.get("category") || "Todas");

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const productsPerPage = 12;

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category !== "Todas") params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("page", currentPage.toString());
    router.replace(`?${params.toString()}`);
  }, [search, category, minPrice, maxPrice, currentPage]);

  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);
  const filteredProducts = productos.filter((product) => {
    const matchesMinPrice =
      minPrice === "" || product.precio >= parseInt(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || product.precio <= parseInt(maxPrice);
    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesCategory =
      category === "Todas" || product.categoria === category;
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

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
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      >
        <option value="Todas">Todas las categorías</option>
        <option value="electrónica">Electrónica</option>
        <option value="ropa">Ropa</option>
        <option value="hogar">Hogar</option>
        <option value="deportes">Deportes</option>
        <option value="libros">Libros</option>
      </select>
      <div className="flex gap-4 mb-6">
        <input
          type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
      </div>
      {Number(minPrice) > Number(maxPrice) && (
        <p className="text-red-500 mb-4">
          El precio mínimo no puede ser mayor que el precio máximo.
        </p>
      )}
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

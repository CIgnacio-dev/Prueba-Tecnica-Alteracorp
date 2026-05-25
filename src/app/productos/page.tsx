"use client";
import { productos } from "@/lib/mocks/products";
import { useEffect, useState, useRef, Suspense } from "react";
import { ProductCard } from "@/src/components/products/product-card";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ProductosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || Number(1),
  );
  const [category, setCategory] = useState(
    searchParams.get("category") || "Todas",
  );

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const hasPriceError =
    minPrice && maxPrice && Number(minPrice) > Number(maxPrice);

  const productsPerPage = 12;

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;

    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category !== "Todas") params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    params.set("page", currentPage.toString());
    try {
      router.replace(`?${params.toString()}`);
    } catch (error) {
      // Router not ready
    }
  }, [search, category, minPrice, maxPrice, currentPage, router]);

  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);
  const filteredProducts = productos.filter((product) => {
    const matchesPrice = hasPriceError
      ? true
      : (!minPrice || product.precio >= Number(minPrice)) &&
        (!maxPrice || product.precio <= Number(maxPrice));
    const matchesMaxPrice =
      maxPrice === "" || product.precio <= parseInt(maxPrice);
    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesCategory =
      category === "Todas" || product.categoria === category;

    return matchesSearch && matchesCategory && matchesPrice;
  });
  const clearFilters = () => {
    setSearch("");
    setCategory("Todas");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
    router.push("/productos");
  };
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const hasNoResults = filteredProducts.length === 0;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );
  return (
    <main className="bg-gradient-to-r from-gray-700 via-gray-900 to-black p-6 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
      <label htmlFor="search" className="block font-semibold mb-2">
        Buscar por nombre:
      </label>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-2 border rounded"
      />
      <label htmlFor="category" className="block font-semibold mb-2">
        Filtrar por categoría:
      </label>

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-75 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white p-2 border rounded mb-4">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>

        <SelectContent className="w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black  text-white">
          <SelectItem value="Todas" className="focus:bg-zinc-700">
            Todas las categorías
          </SelectItem>

          <SelectItem value="electrónica" className="focus:bg-zinc-700">
            Electrónica
          </SelectItem>

          <SelectItem value="ropa" className="focus:bg-zinc-700">
            Ropa
          </SelectItem>

          <SelectItem value="hogar" className="focus:bg-zinc-700">
            Hogar
          </SelectItem>

          <SelectItem value="deportes" className="focus:bg-zinc-700">
            Deportes
          </SelectItem>

          <SelectItem value="libros" className="focus:bg-zinc-700">
            Libros
          </SelectItem>
        </SelectContent>
      </Select>
      <label htmlFor="price" className="block font-semibold mb-2">
        Filtrar por precio:
      </label>
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
      {hasPriceError && (
        <p
          role="alert"
          className="
      text-red-400
      text-sm
      mt-2
    "
        >
          El precio mínimo no puede ser mayor al máximo.
        </p>
      )}
      <button
        onClick={clearFilters}
        className="mb-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Limpiar filtros
      </button>
      {hasNoResults ? (
        <p
          role="status"
          className="
      text-zinc-400
      text-center
      py-10
      text-lg
    "
        >
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="flex items-center mt-8">
        <button
          aria-label="Página anterior"
          onClick={() =>
            setCurrentPage((prev: number) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <span className="mx-2">
          Página {currentPage} de {totalPages}
        </span>
        <button
          aria-label="Página siguiente"
          onClick={() =>
            setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="p-6">Cargando...</div>}>
      <ProductosContent />
    </Suspense>
  );
}

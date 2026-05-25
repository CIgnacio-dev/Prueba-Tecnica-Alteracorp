import { Producto } from "@/src/types/products";
import  Link  from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

type ProductCardProps = {
  product: Producto;
};

export function ProductCard({
  product,
}: ProductCardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [added, setAdded] = useState(false);
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }
  const currentUrl = `/${pathname.replace(/^\/+/, "")}${
  searchParams.toString()
    ? `?${searchParams.toString()}`
    : ""
}`;
  return (
   <Link href={`/productos/${product.id}?from=${encodeURIComponent(currentUrl)}`} className="block p-4 border rounded-lg hover:shadow-lg transition-shadow">
      <img
        src={product.imagen}
        alt={`Imagen de ${product.nombre}`}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h2 className="font-semibold text-lg">
        {product.nombre}
      </h2>

      <p>SKU: {product.sku}</p>

      <p className="capitalize">
        {product.categoria}
      </p>
      <p className="font-bold text-xl mt-2">
        {new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(product.precio)}
      </p>
      {product.stock <= 0 ? (
  <p className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
    Agotado
  </p>
) : product.stock <= 5 ? (
  <p className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
    Pocas unidades
  </p>
) : (
  <p className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
    En Stock
  </p>
  
)}
<button
  onClick={handleAddToCart}
  disabled={product.stock === 0}
  className="
    w-full
    mt-4
    py-2
    rounded-xl
    font-medium
    transition-colors
    disabled:bg-zinc-700
    disabled:text-zinc-400
    disabled:cursor-not-allowed
    bg-blue-600
    hover:bg-blue-700
    text-white
  "
>
  {product.stock === 0
    ? "Sin stock"
    : added
      ? "Agregado ✓"
      : "Agregar al carrito"}
</button>
    </Link>
  );
}
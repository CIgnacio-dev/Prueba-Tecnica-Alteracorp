import { Producto } from "@/src/types/products";
import  Link  from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type ProductCardProps = {
  product: Producto;
};

export function ProductCard({
  product,
}: ProductCardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
<button disabled={product.stock <= 0} className={`mt-4 w-full py-2 px-4 rounded hover:scale-[1.02] ${product.stock <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}>
    {product.stock <= 0 ? "No disponible" : "Agregar al carrito"}
  </button>
    </Link>
  );
}
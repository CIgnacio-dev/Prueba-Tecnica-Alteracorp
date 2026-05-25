import { Producto } from "@/src/types/products";
import  Link  from "next/link";

type ProductCardProps = {
  product: Producto;
};

export function ProductCard({
  product,
}: ProductCardProps) {
  return (
   <Link href={`/productos/${product.id}`} className="block p-4 border rounded-lg hover:shadow-lg transition-shadow">
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
    </Link>
  );
}
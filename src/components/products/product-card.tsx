import { Producto } from "@/src/types/products";
import Link from "next/link";
import {
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

type ProductCardProps = {
  product: Producto;
};

export function ProductCard({
  product,
}: ProductCardProps) {

  const searchParams = useSearchParams();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  const currentUrl = `/productos${
  searchParams.toString()
    ? `?${searchParams.toString()}`
    : ""
}`;

  return (
    <div
      className="
        p-4
        rounded-2xl
        bg-zinc-800
        border
        border-zinc-700
        shadow-lg
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        text-white
      "
    >
      <Link
        href={`/productos/${product.id}?from=${encodeURIComponent(
          currentUrl,
        )}`}
        className="block cursor-pointer"
      >
        <img
          src={product.imagen}
          alt={`Imagen de ${product.nombre}`}
          className="
            w-full
            h-48
            object-cover
            rounded-lg
            mb-4
          "
        />

        <h2 className="font-semibold text-lg">
          {product.nombre}
        </h2>

        <p className="text-zinc-400">
          SKU: {product.sku}
        </p>

        <p className="capitalize text-zinc-300">
          {product.categoria}
        </p>

        <p className="font-bold text-2xl mt-3">
          {new Intl.NumberFormat(
            "es-CL",
            {
              style: "currency",
              currency: "CLP",
            },
          ).format(product.precio)}
        </p>
      </Link>

      {product.stock <= 0 ? (
        <p
          className="
            inline-block
            mt-3
            px-3
            py-1
            bg-zinc-700
            text-zinc-300
            text-sm
            rounded-full
          "
        >
          Agotado
        </p>
      ) : product.stock <= 5 ? (
        <p
          className="
            inline-block
            mt-3
            px-3
            py-1
            bg-yellow-500/20
            text-yellow-300
            text-sm
            rounded-full
          "
        >
          Pocas unidades
        </p>
      ) : (
        <p
          className="
            inline-block
            mt-3
            px-3
            py-1
            bg-green-500/20
            text-green-300
            text-sm
            rounded-full
          "
        >
          En stock
        </p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="
          w-full
          mt-4
          py-3
          rounded-xl
          font-medium
          transition-all
          duration-200
          bg-blue-600
          hover:bg-blue-700
          hover:scale-[1.01]
          text-white
          disabled:bg-zinc-700
          disabled:text-zinc-400
          disabled:cursor-not-allowed
          disabled:hover:scale-100
        "
      >
        {product.stock === 0
          ? "Sin stock"
          : added
            ? "Agregado ✓"
            : "Agregar al carrito"}
      </button>
    </div>
  );
}
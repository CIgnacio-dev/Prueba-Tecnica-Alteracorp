import { notFound } from "next/navigation";
import { productos } from "@/lib/mocks/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const {id} = await params;
  const product = productos.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="p-6">
      <img src={product.imagen} alt={`Imagen de ${product.nombre}`} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{product.nombre}</h1>
      <p className="text-gray-600 mb-4">{product.descripcion}</p>
        <p className="font-bold text-xl">
            {new Intl.NumberFormat("es-CL", {
              style: "currency",
              currency: "CLP",
            }).format(product.precio)}
          </p>
        <p className="mt-4">
            <span className="font-semibold">SKU:</span> {product.sku}
        </p>
        <p>
            <span className="font-semibold">Categoría:</span> {product.categoria}   
        </p>
        <p>
            <span className="font-semibold">Stock disponible:</span> {product.stock} unidades
        </p>
    </main>
  )};

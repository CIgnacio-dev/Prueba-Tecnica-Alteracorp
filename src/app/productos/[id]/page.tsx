import { notFound } from "next/navigation";
import { productos } from "@/lib/mocks/products";
import  Link  from "next/link";



type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
    url?: string;
  }>;
};

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const {id} = await params;
  
  const product = productos.find((p) => p.id === id);
  const {from} = await searchParams;


  if (!product) {
    notFound();
  }

  return (
    <main className="bg-gradient-to-r from-gray-700 via-gray-900 to-black p-6 min-h-screen text-white">
      <Link href={from || "/productos"} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Volver a productos
      </Link>
      <img src={product.imagen} alt={`Imagen de ${product.nombre}`} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-2">{product.nombre}</h1>
      <p className="text-white-600 mb-4">{product.descripcion}</p>
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

import { productos } from "@/lib/mocks/products";

export default function ProductosPage() {
    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {productos.slice(0,12).map((product) => (
                    <div    key={product.id} className="border rounded-lg p-4">
                        <img
              src={product.imagen}
              alt={`Imagen de ${product.nombre}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h2 className="font-semibold text-lg">
              {product.nombre}
            </h2>

            <p className="text-sm text-gray-500">
              SKU: {product.sku}
            </p>

            <p className="mt-2 capitalize">
              {product.categoria}
            </p>

            <p className="font-bold text-xl mt-2">
              {new Intl.NumberFormat("es-CL", {
                style: "currency",
                currency: "CLP",
              }).format(product.precio)}
            </p>
            </div>
                ))}
            </div>
        </main>
    );
}
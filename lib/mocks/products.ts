import { Producto } from "../../src/types/products";
import { v4 as uuid } from "uuid";

const categorias = [
    "electrónica",
    "hogar",
    "deportes",
    "libros",
    "ropa"
] as const;

export const productos: Producto[] = Array.from({ length: 50 }, (_, index) => ({
    id: crypto.randomUUID(),
    sku: `PRD-${String(index + 1).padStart(5, "0")}`,
    nombre: `Producto ${index + 1}`,
    descripcion: `Descripción del producto ${index + 1}`,
    categoria: categorias[index % categorias.length],
    precio: (index + 1) * 1000,
    stock: index % 15,
    imagen: "/placeholder.png"
}));
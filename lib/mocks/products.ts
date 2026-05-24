import { Producto } from "../../src/types/products";

const categorias = [
    "electrónica",
    "hogar",
    "deportes",
    "libros",
    "ropa"
] as const;

export const productos: Producto[] = Array.from({ length: 50 }, (_, index) => ({
    id: String(index + 1),
    sku: `SKU-${index + 1}`,
    nombre: `Producto ${index + 1}`,
    descripcion: `Descripción del producto ${index + 1}`,
    categoria: categorias[index % categorias.length],
    precio: (index + 1) * 1000,
    stock: Math.floor(Math.random() * 100) + 1,
    imagen: "/placeholder.png"
}));
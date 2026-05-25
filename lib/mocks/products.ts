import { Producto } from "../../src/types/products";


const categorias = [
    "electrónica",
    "hogar",
    "deportes",
    "libros",
    "ropa"
] as const;

export const productos: Producto[] = Array.from({ length: 50 }, (_, index) => ({
    id: `550e8400-e29b-41d4-a716-${String(index + 1).padStart(12, "0")}`,
    sku: `PRD-${String(index + 1).padStart(5, "0")}`,
    nombre: `Producto ${index + 1}`,
    descripcion: `Descripción del producto ${index + 1}`,
    categoria: categorias[index % categorias.length],
    precio: (index + 1) * 1000,
    stock: index % 15,
    imagen: "/placeholder.png"
}));
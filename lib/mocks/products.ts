import { Producto } from "../../src/types/products";

const categorias = [
    "electrónica",
    "hogar",
    "deportes",
    "libros",
    "ropa"
] as const;

export const productos: Producto[] = Array.from({ length: 50 }, (_, index) => ({
    id: crypto.randomUUID(),
    sku: `SKU-${index + 1}`,
    nombre: `Producto ${index + 1}`,
    descripcion: `Descripción del producto ${index + 1}`,
    categoria: categorias[index % categorias.length],
    precio: Math.floor(Math.random() * 1000) + 1,
    stock: Math.floor(Math.random() * 100) + 1,
    imagen: `https://via.placeholder.com/300x300?text=Producto+${index + 1}`
}));
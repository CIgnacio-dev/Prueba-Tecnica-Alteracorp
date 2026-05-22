export type Categoria = 
    | "electrónica"
    | "hogar"
    | "deportes"
    | "libros"
    | "ropa";

export type Producto = {
    id : string,
    sku: string,
    nombre: string,
    descripcion: string,
    categoria: Categoria,
    precio: number,
    stock: number,
    imagen: string
} 
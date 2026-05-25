# Prueba Técnica FrontEnd - Alteracorp

## Descripción

Aplicación web desarrollada con Next.js, TypeScript y Tailwind CSS que permite visualizar un catálogo de productos con:

- búsqueda con debounce
- filtros
- paginación
- sincronización con URL
- detalle de producto
- validaciones
- testing básico

El proyecto fue desarrollado utilizando App Router de Next.js y componentes reutilizables.

---

## Tecnologías utilizadas

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vitest
- React Testing Library

---

## Funcionalidades implementadas

### Catálogo de productos
- Grid responsive de productos
- Cards reutilizables
- Diseño responsive y dark UI

### Búsqueda y filtros
- Búsqueda por nombre
- Debounce para optimizar búsqueda
- Filtro por categoría
- Filtro por rango de precios
- Validación min/max
- Botón limpiar filtros

### Paginación
- Navegación entre páginas
- Persistencia del estado

### URL Sync
Los filtros y la paginación se sincronizan con la URL mediante search params.

Ejemplo:
```bash
/productos?q=mouse&category=electronica&page=2

Esto permite:

compartir URLs
mantener filtros al refrescar
navegación consistente
Detalle de producto
Ruta dinámica /productos/[id]
Vista individual
Información detallada
Navegación de regreso manteniendo filtros
Estados de stock
En stock
Pocas unidades
Agotado
Manejo de errores
Página personalizada not-found.tsx
Mensaje de “sin resultados”
Testing

Se implementaron pruebas utilizando Vitest y React Testing Library:

Hook tests
useDebounce
Component tests
renderizado de ProductCard
badges de stock

Instalación

Clonar repositorio:

git clone https://github.com/CIgnacio-dev/Prueba-Tecnica-Alteracorp.git

Entrar al proyecto:

cd "Prueba Tecnica Alteracorp"

Instalar dependencias:

npm install
Ejecutar proyecto
npm run dev

Abrir en navegador:

http://localhost:3000
Ejecutar tests
npx vitest
Build de producción
npm run build
Estructura del proyecto
src/
├── app/
│   ├── productos/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   └── not-found.tsx
│
├── components/
│   ├── products/
│   │   ├── product-card.tsx
│   │   └── product-card.test.tsx
│   │
│   └── ui/
│
├── lib/
│   ├── hooks/
│   │   ├── use-debounce.ts
│   │   └── use-debounce.test.ts
│   │
│   └── mocks/
│       └── products.ts
│
└── types/
    └── products.ts

Decisiones técnicas
useDebounce

Se implementó un hook personalizado para optimizar la búsqueda y evitar renders innecesarios mientras el usuario escribe.

URL State

Los filtros se sincronizan con la URL utilizando search params para mejorar UX y persistencia del estado.

Mock de datos

Se utilizaron datos mockeados para desacoplar el frontend de un backend real y facilitar testing/desarrollo.

Componentización

Se separaron componentes reutilizables para mantener mejor organización y escalabilidad.

Client vs Server Components

Se utilizaron Client Components en páginas con:

filtros
búsqueda
paginación
interacción de usuario

Se utilizaron Server Components por defecto cuando fue posible.

Uso de IA

Se utilizó ChatGPT y GitHub Copilot como apoyo para:

resolución de dudas técnicas
debugging
optimización de componentes
testing
mejoras visuales

Las decisiones finales de implementación y adaptación fueron realizadas manualmente.

Trade-offs y mejoras futuras

Por tiempo y alcance de la prueba:

no se implementó backend real
no se implementó carrito funcional
los productos utilizan mocks locales

Mejoras futuras:

integración API real
carrito persistente
autenticación
testing E2E
virtualización de listas
skeleton loaders




Autor

Carlos Roa Troncoso
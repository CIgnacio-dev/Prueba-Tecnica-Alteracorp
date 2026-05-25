import { render, screen }
from "@testing-library/react";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { ProductCard }
from "./product-card";

import { Producto }
from "@/src/types/products";

vi.mock("next/navigation", () => ({
  usePathname: () => "/productos",

  useSearchParams: () => ({
    toString: () => "",
  }),
}));

const product: Producto = {
  id: "1",
  nombre: "Producto Test",
  descripcion: "Descripción",
  categoria: "ropa",
  precio: 1000,
  stock: 10,
  sku: "SKU-1",
  imagen: "/placeholder.png",
};

describe("ProductCard", () => {
  it("should render product info", () => {
    render(
      <ProductCard product={product} />
    );

    expect(
      screen.getByText(
        /producto test/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/sku-1/i)
    ).toBeInTheDocument();
  });

  it("should show stock badge", () => {
    render(
      <ProductCard product={product} />
    );

    expect(
      screen.getByText(/en stock/i)
    ).toBeInTheDocument();
  });
});
import Products from "@/components/ProductsComopnents/Products";
import ProductsHero from "@/components/ProductsComopnents/ProductsHero";
import React from "react";

export default function ProductsPage() {
  return (
    <div>
      <ProductsHero />
      <Products category="curtains" />
    </div>
  );
}

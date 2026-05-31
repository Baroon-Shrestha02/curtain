import Products from "@/components/ProductsComopnents/Products";
import ProductsHero from "@/components/ProductsComopnents/ProductsHero";
import React from "react";

export default function BlindsPage() {
  return (
    <div>
      <ProductsHero />
      <Products category="blinds" />
    </div>
  );
}

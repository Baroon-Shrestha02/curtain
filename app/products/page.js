"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Products from "@/components/ProductsComopnents/Products";
import ProductsHero from "@/components/ProductsComopnents/ProductsHero";

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  return (
    <div>
      <ProductsHero />
      <Products category={category} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div>
          <ProductsHero />
        </div>
      }
    >
      <ProductsPageInner />
    </Suspense>
  );
}

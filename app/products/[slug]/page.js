"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductDetail from "@/components/ProductsComopnents/Products/productDetails";
import {
  getProductBySlug,
  getProducts,
} from "@/components/services/ProductsApi";

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setNotFound(false);

    Promise.all([getProductBySlug(slug), getProducts()])
      .then(([prod, allProds]) => {
        if (!prod) {
          setNotFound(true);
        } else {
          setProduct(prod);
          setProducts(allProds?.products ?? allProds ?? []);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <ProductPageSkeleton />;

  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.32em] text-[#C9A84C]">
            404
          </p>
          <h2 className="text-3xl font-light text-black">Product not found</h2>
          <p className="mt-3 text-sm text-black/50">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="mt-8 rounded-full bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#62101F]"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      products={products}
      onBack={() => router.push("/products")}
    />
  );
}

// ── Skeleton loader ────────────────────────────────────────────────────────
function ProductPageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f7f7f5] px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* back link */}
        <div className="mb-10 h-3 w-32 rounded-full bg-black/10" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* image */}
          <div className="aspect-[4/3] rounded-[1.5rem] bg-black/10" />

          {/* content */}
          <div className="flex flex-col gap-5 pt-2">
            <div className="h-2.5 w-24 rounded-full bg-black/10" />
            <div className="h-10 w-3/4 rounded-xl bg-black/10" />
            <div className="h-8 w-32 rounded-xl bg-black/10" />
            <div className="mt-2 space-y-2">
              <div className="h-3 w-full rounded-full bg-black/10" />
              <div className="h-3 w-5/6 rounded-full bg-black/10" />
              <div className="h-3 w-4/6 rounded-full bg-black/10" />
            </div>
            <div className="mt-4 flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-20 rounded-full bg-black/10" />
              ))}
            </div>
            <div className="mt-6 h-14 w-full rounded-full bg-black/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

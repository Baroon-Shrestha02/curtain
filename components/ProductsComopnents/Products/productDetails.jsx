"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Check,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCard from "./ProductCard";

// ── Props ──────────────────────────────────────────────────────────────────
// product  : full product object from MongoDB / API
// products : full product list (for "More From Our Collection")
// onBack   : optional override for back navigation

export default function ProductDetail({ product, products = [], onBack }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setActiveColor(product?.colors?.[0] ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product?._id]);

  const handleBack = () => {
    if (onBack) return onBack();
    router.push("/products");
  };

  // ── Guard ─────────────────────────────────────────────────────────────────
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
        <div className="text-center">
          <h2 className="text-2xl font-light text-black">Product not found</h2>
          <button
            onClick={handleBack}
            className="mt-6 rounded-full bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // ── Derived values ────────────────────────────────────────────────────────
  const images = product.images?.length
    ? product.images.map((img) => img.url)
    : [];

  const hasDiscount = product.discount > 0;

  const prevImage = () =>
    setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleWhatsApp = () => {
    const colorLine = activeColor ? `\nColor: ${activeColor.name}` : "";
    const message = `Hello Cozy Curtains, I am interested in this product.\n\nProduct Name: ${product.name}\nCategory: ${product.subcategory}${colorLine}\nPrice: Rs. ${product.price}\nQuantity: ${quantity}\n\nPlease provide more details.`;
    const WHATSAPP_NUMBER =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "977XXXXXXXXXX";
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  // Related products — same subcategory first, fallback to same category
  const related = products
    .filter(
      (p) => p._id !== product._id && p.subcategory === product.subcategory,
    )
    .slice(0, 4);
  const suggestions =
    related.length >= 2
      ? related
      : products.filter((p) => p._id !== product._id).slice(0, 4);

  // Badge colour map
  const badgeColors = {
    New: "bg-[#C9A84C] text-white",
    Bestseller: "bg-black text-white",
    Sale: "bg-[#62101F] text-white",
    Limited: "bg-neutral-700 text-white",
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* ── BACK NAV ── */}
      <div className="px-5 pt-8 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-black/45 transition-colors hover:text-black"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Products
          </button>
        </div>
      </div>

      {/* ── PRODUCT DETAIL ── */}
      <section className="px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-24">
            {/* ──────────── LEFT — Image Gallery ──────────── */}
            <div className="lg:sticky lg:top-16 flex flex-col gap-4">
              {/* Main image */}
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
                {images.length > 0 ? (
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-black/20 text-sm uppercase tracking-widest">
                    No image
                  </div>
                )}

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.18em] ${
                      badgeColors[product.badge] ?? "bg-black text-white"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Out of stock overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                    <span className="rounded-full border border-black/20 bg-white px-6 py-2 text-xs uppercase tracking-[0.2em] text-black/60">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Carousel arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-white"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-white"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeImage
                            ? "w-6 bg-black"
                            : "w-1.5 bg-black/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                        i === activeImage
                          ? "border-black"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ──────────── RIGHT — Content ──────────── */}
            <div className="flex flex-col justify-start pt-2">
              {/* Subcategory tag */}
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#C9A84C]">
                {product.subcategory}
              </p>

              {/* Name */}
              <h1 className="text-4xl font-light capitalize tracking-wide text-black md:text-5xl">
                {product.name}
              </h1>

              {/* Stock indicator */}
              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] ${
                    product.inStock ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.inStock ? (
                    <>
                      <Check size={12} /> In Stock
                    </>
                  ) : (
                    <>
                      <X size={12} /> Out of Stock
                    </>
                  )}
                </span>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl font-light text-black">
                  Rs. {product.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-black/35 line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="rounded-full bg-[#62101F]/10 px-3 py-1 text-xs font-medium text-[#62101F]">
                      {product.discount}% off
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="mt-5 text-sm leading-7 text-black/60">
                {product.description}
              </p>

              {/* Features */}
              {product.features?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.features.map((f) => (
                    <span
                      key={f}
                      className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs uppercase tracking-[0.14em] text-black/65"
                    >
                      <Check size={11} className="text-[#C9A84C]" />
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* Colors */}
              {product.colors?.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/45">
                    Color
                    {activeColor && (
                      <span className="ml-2 normal-case capitalize tracking-normal text-black">
                        — {activeColor.name}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color._id}
                        onClick={() => setActiveColor(color)}
                        title={color.name}
                        className={`h-9 w-9 rounded-full border-2 transition-all duration-200 ${
                          activeColor?._id === color._id
                            ? "border-black scale-110 shadow-md"
                            : "border-white shadow-sm hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Specs */}
              {product.specs?.length > 0 && (
                <div className="mt-8">
                  <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/40">
                    Specifications
                  </p>
                  <div className="overflow-hidden rounded-[1.2rem] border border-black/10">
                    <table className="w-full text-sm">
                      <tbody>
                        {product.specs.map((spec, i) => (
                          <tr
                            key={spec._id}
                            className={
                              i % 2 === 0 ? "bg-white" : "bg-[#f7f7f5]"
                            }
                          >
                            <td className="w-[42%] border-r border-black/[0.06] px-5 py-3.5 text-xs uppercase tracking-[0.18em] text-black/40">
                              {spec.label}
                            </td>
                            <td className="px-5 py-3.5 text-xs uppercase tracking-[0.14em] text-black/75">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  disabled={!product.inStock}
                  className="flex flex-1 items-center justify-center gap-3 rounded-full bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#62101F] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <MessageCircle size={16} />
                  Enquire on WhatsApp
                </button>
              </div>

              <p className="mt-5 text-xs tracking-wide text-black/35">
                Free consultation · Premium quality · Made to measure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="px-5 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl border-t border-black/10" />
      </div>

      {/* ── MORE PRODUCTS ── */}
      {suggestions.length > 0 && (
        <section className="px-5 py-16 md:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.32em] text-[#C9A84C]">
                  You May Also Like
                </p>
                <h2 className="text-3xl font-light tracking-wide text-black">
                  More From Our Collection
                </h2>
              </div>
              <button
                onClick={handleBack}
                className="hidden text-xs uppercase tracking-[0.2em] text-black/40 transition hover:text-black md:block"
              >
                View All →
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {suggestions.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  onView={(prod) =>
                    router.push(prod.href ?? `/products/${prod.slug}`)
                  }
                  onWhatsApp={(prod) => {
                    const WHATSAPP_NUMBER =
                      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
                      "977XXXXXXXXXX";
                    const msg = `Hello Cozy Curtains, I am interested in ${prod.name} (Rs. ${prod.price}). Please provide more details.`;
                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
                      "_blank",
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCard from "./Products/ProductCard";
import {
  getProducts,
  getCategories,
  getSubcategoriesBySlug,
} from "../services/ProductsApi";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "977XXXXXXXXXX";

const BADGES = ["New", "Bestseller", "Sale", "Limited"];

const SORT_OPTIONS = {
  newest: { sort: "createdAt", order: "desc", label: "Newest" },
  "low-high": {
    sort: "discountedPricePerSqFt",
    order: "asc",
    label: "Price: Low to High",
  },
  "high-low": {
    sort: "discountedPricePerSqFt",
    order: "desc",
    label: "Price: High to Low",
  },
  discount: { sort: "discount", order: "desc", label: "Best Discount" },
};

const COPY_DEFAULT = {
  eyebrow: "Our Collection",
  title: "Explore Our Premium Collection",
  subtitle:
    "Browse premium collections, filter by style, search by product name, and request details on WhatsApp.",
  searchPlaceholder: "Search products...",
};

const buildCopy = (categoryName) => {
  if (!categoryName) return COPY_DEFAULT;
  const display =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
  return {
    eyebrow: "Our Collection",
    title: `Explore Our Premium ${display}`,
    subtitle: `Browse premium ${display.toLowerCase()} collections, filter by style, search by product name, and request details on WhatsApp.`,
    searchPlaceholder: `Search ${display.toLowerCase()}…`,
  };
};

export default function Products({ category = "" }) {
  const router = useRouter();

  // ── Resolve category: prop may be slug, name, or empty (= all).
  const [resolvedCategoryName, setResolvedCategoryName] = useState("");
  const [resolvedCategorySlug, setResolvedCategorySlug] = useState("");

  // ── Filter state ─────────────────────────────────────────────────────────
  const [activeSubcategory, setActiveSubcategory] = useState("All");
  const [activeBadge, setActiveBadge] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // ── Data state ───────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const copy = useMemo(
    () => buildCopy(resolvedCategoryName),
    [resolvedCategoryName],
  );

  // Resolve the prop against backend categories so we always have the canonical name.
  useEffect(() => {
    let cancelled = false;
    const propLower = (category || "").trim().toLowerCase();

    getCategories()
      .then((cats) => {
        if (cancelled) return;
        if (!propLower) {
          setResolvedCategoryName("");
          setResolvedCategorySlug("");
          return;
        }
        const match = cats.find(
          (c) =>
            c.slug?.toLowerCase() === propLower ||
            c.name?.toLowerCase() === propLower,
        );
        setResolvedCategoryName(match?.name || propLower);
        setResolvedCategorySlug(match?.slug || propLower);
      })
      .catch(() => {
        if (cancelled) return;
        setResolvedCategoryName(propLower);
        setResolvedCategorySlug(propLower);
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  // Reset selected subcategory when switching categories
  useEffect(() => {
    setActiveSubcategory("All");
  }, [resolvedCategorySlug]);

  // Load subcategories scoped to the selected category
  useEffect(() => {
    let cancelled = false;
    if (!resolvedCategorySlug) {
      setSubcategories([]);
      return () => {
        cancelled = true;
      };
    }
    getSubcategoriesBySlug(resolvedCategorySlug)
      .then((subs) => {
        if (!cancelled)
          setSubcategories(subs.map((s) => s.name || s).filter(Boolean));
      })
      .catch(() => {
        if (!cancelled) setSubcategories([]);
      });
    return () => {
      cancelled = true;
    };
  }, [resolvedCategorySlug]);

  // Debounced price values so typing doesn't spam the backend
  const debouncedMinPrice = useDebounce(minPrice, 350);
  const debouncedMaxPrice = useDebounce(maxPrice, 350);

  // Fetch products whenever any server-side filter changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const { sort, order } = SORT_OPTIONS[sortBy] ?? SORT_OPTIONS.newest;

    const params = {
      sort,
      order,
      limit: 60,
    };

    if (resolvedCategoryName) params.category = resolvedCategoryName;
    if (activeSubcategory !== "All") params.subcategory = activeSubcategory;
    if (activeBadge !== "All") params.badge = activeBadge;
    if (debouncedMinPrice) params.minPrice = Number(debouncedMinPrice);
    if (debouncedMaxPrice) params.maxPrice = Number(debouncedMaxPrice);

    getProducts(params)
      .then(({ products, total }) => {
        if (cancelled) return;
        setProducts(products);
        setTotal(total);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setProducts([]);
        setTotal(0);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    resolvedCategoryName,
    activeSubcategory,
    activeBadge,
    sortBy,
    debouncedMinPrice,
    debouncedMaxPrice,
  ]);

  // Client-side search (backend has no text-search endpoint)
  const visibleProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleView = (product) => {
    router.push(product.href ?? `/products/${product.slug}`);
  };

  const handleWhatsApp = (product) => {
    const price =
      product.discountedPricePerSqFt ?? product.pricePerSqFt ?? 0;
    const message = `Hello Cozy Curtains, I am interested in this product.\n\nProduct Name: ${product.name}\nCategory: ${product.subcategory}\nPrice: Rs. ${Number(price).toLocaleString()} / sq ft\n\nPlease provide more details.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const clearFilters = () => {
    setActiveSubcategory("All");
    setActiveBadge("All");
    setSearchQuery("");
    setSortBy("newest");
    setMinPrice("");
    setMaxPrice("");
  };

  const activeFilterCount =
    (activeSubcategory !== "All" ? 1 : 0) +
    (activeBadge !== "All" ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  return (
    <section className="bg-[#f7f7f5] px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#C9A84C]">
                {copy.eyebrow}
              </p>
              <h2 className="text-4xl font-light tracking-wide text-black md:text-6xl">
                {copy.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-black/55">
                {copy.subtitle}
              </p>
            </div>
            <div className="text-sm uppercase tracking-[0.24em] text-black/45">
              Showing{" "}
              <span className="text-black">{visibleProducts.length}</span> of{" "}
              {total} products
            </div>
          </div>

          {/* SEARCH / SORT / FILTER */}
          <div className="grid gap-4 rounded-[1.5rem] border border-black/10 bg-white p-4 shadow-sm lg:grid-cols-[1.3fr_0.7fr_auto]">
            <div className="flex items-center gap-3 rounded-full bg-[#f7f7f5] px-5 py-4">
              <Search size={18} className="text-black/40" />
              <input
                type="text"
                placeholder={copy.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X size={17} />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-black/10 bg-white px-5 py-4 text-sm outline-none"
            >
              {Object.entries(SORT_OPTIONS).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#62101F]"
            >
              <SlidersHorizontal size={17} />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-[#C9A84C] px-2 py-0.5 text-[10px] font-semibold text-black">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* FILTER PANEL */}
          {showFilters && (
            <div className="space-y-6 rounded-[1.5rem] border border-black/10 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm uppercase tracking-[0.22em] text-black">
                  Filter Results
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-xs uppercase tracking-[0.18em] text-black/45 hover:text-black"
                >
                  Clear All
                </button>
              </div>

              {/* Subcategory */}
              {subcategories.length > 0 && (
                <FilterGroup label="Subcategory">
                  <div className="flex flex-wrap gap-3">
                    <Chip
                      active={activeSubcategory === "All"}
                      onClick={() => setActiveSubcategory("All")}
                    >
                      All
                    </Chip>
                    {subcategories.map((sub) => (
                      <Chip
                        key={sub}
                        active={activeSubcategory === sub}
                        onClick={() => setActiveSubcategory(sub)}
                      >
                        {sub}
                      </Chip>
                    ))}
                  </div>
                </FilterGroup>
              )}

              {/* Badge */}
              <FilterGroup label="Badge">
                <div className="flex flex-wrap gap-3">
                  <Chip
                    active={activeBadge === "All"}
                    onClick={() => setActiveBadge("All")}
                  >
                    All
                  </Chip>
                  {BADGES.map((b) => (
                    <Chip
                      key={b}
                      active={activeBadge === b}
                      onClick={() => setActiveBadge(b)}
                    >
                      {b}
                    </Chip>
                  ))}
                </div>
              </FilterGroup>

              {/* Price */}
              <FilterGroup label="Price / sq ft (Rs.)">
                <div className="flex flex-wrap items-center gap-3">
                  <PriceInput
                    placeholder="Min"
                    value={minPrice}
                    onChange={setMinPrice}
                  />
                  <span className="text-xs text-black/40">to</span>
                  <PriceInput
                    placeholder="Max"
                    value={maxPrice}
                    onChange={setMaxPrice}
                  />
                </div>
              </FilterGroup>
            </div>
          )}
        </div>

        {/* RESULTS */}
        {loading ? (
          <ProductGridSkeleton />
        ) : error ? (
          <ErrorState onRetry={clearFilters} />
        ) : visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onView={handleView}
                onWhatsApp={handleWhatsApp}
              />
            ))}
          </div>
        ) : (
          <EmptyState onReset={clearFilters} />
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Helpers                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

function FilterGroup({ label, children }) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-black/45">
        {label}
      </p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-5 py-3 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
        active
          ? "border-black bg-black text-white"
          : "border-black/10 bg-white text-black/60 hover:border-black hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

function PriceInput({ placeholder, value, onChange }) {
  return (
    <input
      type="number"
      inputMode="numeric"
      min={0}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-28 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
    />
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-black/5 bg-white"
        >
          <div className="aspect-square bg-black/10" />
          <div className="space-y-3 p-4">
            <div className="h-2.5 w-20 rounded-full bg-black/10" />
            <div className="h-4 w-3/4 rounded-full bg-black/10" />
            <div className="h-4 w-1/3 rounded-full bg-black/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-white px-6 py-20 text-center">
      <h3 className="text-2xl font-light text-black">No products found</h3>
      <p className="mt-3 text-sm text-black/50">
        Try changing your search keyword or filters.
      </p>
      <button
        onClick={onReset}
        className="mt-6 rounded-full bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white"
      >
        Reset Filters
      </button>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="rounded-[1.5rem] border border-red-200 bg-red-50 px-6 py-20 text-center">
      <h3 className="text-2xl font-light text-[#62101F]">
        Couldn&apos;t load products
      </h3>
      <p className="mt-3 text-sm text-black/55">
        Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-full bg-[#62101F] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white"
      >
        Reset &amp; Retry
      </button>
    </div>
  );
}

// ── tiny debounce hook ──────────────────────────────────────────────────────
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer.current);
  }, [value, delay]);

  return debounced;
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  categories,
  productData,
  WHATSAPP_NUMBER,
} from "./Products/ProductsData";
import ProductModal from "./Products/ProductModal";
import ProductCard from "./Products/ProductCard";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("best");
  const [showFilters, setShowFilters] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct]);

  const filteredProducts = useMemo(() => {
    let items = [...productData];

    if (activeCategory !== "All") {
      items = items.filter((product) => product.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      items = items.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query),
      );
    }

    if (sortBy === "low-high") {
      items.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-low") {
      items.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "newest") {
      items.sort((a, b) => b.id - a.id);
    }

    if (sortBy === "sale") {
      items.sort((a, b) => Number(b.sale) - Number(a.sale));
    }

    if (sortBy === "best") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  const handleWhatsApp = (product) => {
    const message = `
Hello Cozy Curtains, I am interested in this product.

Product Name: ${product.name}
Category: ${product.category}
Price: Rs. ${product.price}

Please provide more details.
`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappURL, "_blank");
  };

  const clearFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSortBy("best");
  };

  return (
    <>
      <section className="bg-[#f7f7f5] px-5 py-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mb-12 flex flex-col gap-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.32em] text-[#C9A84C]">
                  Our Collection
                </p>

                <h2 className="text-4xl font-light tracking-wide text-black md:text-6xl">
                  Explore Our Premium Collection
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-black/55">
                  Browse premium curtain collections, filter by style, search by
                  product name, and directly request details on WhatsApp.
                </p>
              </div>

              <div className="text-sm uppercase tracking-[0.24em] text-black/45">
                Showing{" "}
                <span className="text-black">{filteredProducts.length}</span> of{" "}
                {productData.length} products
              </div>
            </div>

            {/* SEARCH / SORT / FILTER */}
            <div className="grid gap-4 rounded-[1.5rem] border border-black/10 bg-white p-4 shadow-sm lg:grid-cols-[1.3fr_0.7fr_auto]">
              <div className="flex items-center gap-3 rounded-full bg-[#f7f7f5] px-5 py-4">
                <Search size={18} className="text-black/40" />

                <input
                  type="text"
                  placeholder="Search curtain, blackout, jacquard..."
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
                <option value="best">Best Rating</option>
                <option value="newest">Newest</option>
                <option value="sale">Sale First</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-3 rounded-full bg-black px-7 py-4 text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#62101F]"
              >
                <SlidersHorizontal size={17} />
                Filter
              </button>
            </div>

            {/* CATEGORY FILTERS */}
            {showFilters && (
              <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm uppercase tracking-[0.22em] text-black">
                    Filter By Category
                  </h3>

                  <button
                    onClick={clearFilters}
                    className="text-xs uppercase tracking-[0.18em] text-black/45 hover:text-black"
                  >
                    Clear All
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-5 py-3 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                        activeCategory === category
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white text-black/60 hover:border-black hover:text-black"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={setSelectedProduct}
                  onWhatsApp={handleWhatsApp}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-black/10 bg-white px-6 py-20 text-center">
              <h3 className="text-2xl font-light text-black">
                No products found
              </h3>

              <p className="mt-3 text-sm text-black/50">
                Try changing your search keyword or category filter.
              </p>

              <button
                onClick={clearFilters}
                className="mt-6 rounded-full bg-black px-8 py-4 text-xs uppercase tracking-[0.2em] text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onWhatsApp={handleWhatsApp}
      />
    </>
  );
}

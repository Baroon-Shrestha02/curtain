"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  X,
  Menu,
  Home,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuotationModal from "../ui/QuotationModal";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", to: "/", icon: true },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const searchRef = useRef(null);
  const pathname = usePathname();

  const topBarRef = useRef(null);
  const logoRef = useRef(null);
  const iconsRef = useRef(null);
  const navLinksRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarLinksRef = useRef([]);
  const searchDropRef = useRef(null);
  const stickyNavRef = useRef(null);
  const stickyLogoRef = useRef(null);
  const headerRef = useRef(null);

  const isActive = (to) => pathname === to;

  // Mount stagger
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        topBarRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      );
      tl.fromTo(
        logoRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        "-=0.25",
      );
      if (iconsRef.current?.children) {
        tl.fromTo(
          [...iconsRef.current.children],
          { x: 10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          "-=0.35",
        );
      }
      if (navLinksRef.current) {
        tl.fromTo(
          [...navLinksRef.current.querySelectorAll("li")],
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 },
          "-=0.2",
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // Sticky nav
  useEffect(() => {
    if (!stickyNavRef.current || !stickyLogoRef.current || !headerRef.current)
      return;
    gsap.set(stickyNavRef.current, { y: -60, opacity: 0 });
    gsap.set(stickyLogoRef.current, { x: -40, opacity: 0 });
    const trigger = ScrollTrigger.create({
      trigger: headerRef.current,
      start: "bottom top",
      onEnter: () => {
        gsap.to(stickyNavRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.38,
          ease: "power3.out",
        });
        gsap.to(stickyLogoRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.42,
          ease: "power3.out",
          delay: 0.12,
        });
      },
      onLeaveBack: () => {
        gsap.to(stickyLogoRef.current, {
          x: -40,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
        });
        gsap.to(stickyNavRef.current, {
          y: -60,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          delay: 0.06,
        });
      },
    });
    return () => trigger.kill();
  }, []);

  // Sidebar open/close
  useEffect(() => {
    if (!sidebarRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.38, ease: "power3.out" },
      );
      gsap.fromTo(
        sidebarLinksRef.current.filter(Boolean),
        { x: 24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.18,
        },
      );
    } else {
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.32,
        ease: "power3.in",
      });
    }
  }, [menuOpen]);

  // Search dropdown
  useEffect(() => {
    if (searchOpen && searchDropRef.current) {
      gsap.fromTo(
        searchDropRef.current,
        { y: -8, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
      );
    }
  }, [searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Body scroll lock — sidebar OR quote modal
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openQuote = () => {
    setMenuOpen(false); // close sidebar if open on mobile
    setQuoteOpen(true);
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      <header ref={headerRef} className="w-full bg-white font-serif shadow-sm">
        {/* MAIN HEADER */}
        <div ref={topBarRef} className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="relative flex items-center justify-between h-[68px] md:h-[84px]">
              {/* LEFT */}
              <div className="flex items-center gap-1" />

              {/* LOGO */}
              <Link
                ref={logoRef}
                href="/"
                className="absolute left-1/2 -translate-x-1/2 text-center group"
              >
                <h1 className="text-xl sm:text-2xl md:text-[2.1rem] font-light tracking-[0.28em] text-black whitespace-nowrap transition-opacity duration-300 group-hover:opacity-60">
                  COZY CURTAINS
                </h1>
                <p className="hidden md:block text-[9px] uppercase tracking-[0.5em] text-gray-400 mt-1">
                  Premium Collection
                </p>
              </Link>

              {/* RIGHT — Icons */}
              <div
                ref={iconsRef}
                className="flex items-center gap-0.5 sm:gap-1"
              >
                {/* Get Quote — desktop */}
                <button
                  onClick={openQuote}
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-black/20 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-black transition-all duration-200 hover:bg-black hover:text-white"
                >
                  Get Quote
                </button>

                <button
                  aria-label="Account"
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <User size={18} />
                </button>

                <button
                  aria-label="Cart"
                  className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <ShoppingBag size={18} />
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-medium leading-none">
                    0
                  </span>
                </button>

                <button
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                  className="md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:block border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ul
              ref={navLinksRef}
              className="flex items-center justify-center gap-8 lg:gap-14 h-[52px]"
            >
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className={`relative flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.28em] transition-all duration-300 pb-0.5 ${
                      isActive(link.to)
                        ? "text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {link.icon && <Home size={12} />}
                    <span>{link.label}</span>
                    <span
                      className={`absolute left-0 -bottom-0.5 h-[1px] bg-black transition-all duration-300 ${isActive(link.to) ? "w-full" : "w-0"}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* STICKY NAV */}
      <div
        ref={stickyNavRef}
        className="fixed top-0 left-0 right-0 z-30 hidden md:block"
        style={{ transform: "translateY(-60px)", opacity: 0 }}
      >
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.07)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="relative flex items-center h-[52px]">
              <Link
                ref={stickyLogoRef}
                href="/"
                className="absolute left-0 flex items-center gap-2 group"
                style={{ opacity: 0, transform: "translateX(-40px)" }}
              >
                <span className="text-[15px] font-light tracking-[0.28em] text-black whitespace-nowrap transition-opacity duration-200 group-hover:opacity-60">
                  COZY CURTAINS
                </span>
              </Link>

              <ul className="flex items-center justify-center gap-8 lg:gap-14 w-full">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className={`relative flex items-center gap-1.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-300 pb-0.5 ${
                        isActive(link.to)
                          ? "text-black"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {link.icon && <Home size={11} />}
                      <span>{link.label}</span>
                      <span
                        className={`absolute left-0 -bottom-0.5 h-[1px] bg-black transition-all duration-300 ${isActive(link.to) ? "w-full" : "w-0"}`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Get Quote in sticky nav */}
              <button
                onClick={openQuote}
                className="absolute right-0 inline-flex items-center gap-1.5 rounded-full border border-black/20 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-black transition-all duration-200 hover:bg-black hover:text-white"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <aside
        ref={sidebarRef}
        style={{ transform: "translateX(100%)" }}
        className="fixed top-0 right-0 z-50 h-full w-[82%] max-w-sm bg-white shadow-[0_10px_60px_rgba(0,0,0,0.18)]"
      >
        <div className="flex items-center justify-between px-6 h-[68px] border-b border-gray-200">
          <div>
            <h2 className="text-xl tracking-[0.3em] font-light">COZY</h2>
            <p className="text-[9px] uppercase tracking-[0.28em] text-gray-400 mt-0.5">
              Premium Curtains
            </p>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 h-11">
            <Search size={16} className="text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col px-5 py-3">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              href={link.to}
              ref={(el) => (sidebarLinksRef.current[i] = el)}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between h-[56px] px-2 border-b border-gray-100 uppercase tracking-[0.2em] text-[12px] transition-colors ${
                isActive(link.to)
                  ? "text-black font-medium"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon && <Home size={14} />}
                <span>{link.label}</span>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* MOBILE SIDEBAR CTA */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-200 bg-white">
          <button
            onClick={openQuote}
            className="flex w-full items-center justify-center h-12 bg-black text-white uppercase tracking-[0.32em] text-[11px] hover:bg-[#62101F] transition-colors duration-200"
          >
            Get Quote
          </button>
        </div>
      </aside>

      {/* QUOTATION MODAL */}
      {quoteOpen && <QuotationModal onClose={() => setQuoteOpen(false)} />}
    </>
  );
}

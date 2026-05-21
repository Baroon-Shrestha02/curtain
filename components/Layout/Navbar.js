"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import {
//   Search,
//   X,
//   Menu,
//   Home,
//   ChevronRight,
//   Phone,
//   Quote,
//   Ruler,
//   Instagram,
//   Facebook,
// } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronRight,
  Home,
  Menu,
  Phone,
  Quote,
  Ruler,
  Search,
  X,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

// Primary nav — lives in the BOTTOM bar (desktop) and the drawer (mobile)
const navLinks = [
  { label: "Home", to: "/", icon: true },
  { label: "About", to: "/about" },
  { label: "Curtains", to: "/products" },
  { label: "Blends", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Contact Us", to: "/contact" },
];

// Secondary quick links — live in the TOP wine utility strip
const quickLinks = [
  { label: "Gallery", to: "/gallery" },
  { label: "FAQ", to: "/faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const pathname = usePathname();

  const topBarRef = useRef(null);
  const brandBarRef = useRef(null);
  const logoRef = useRef(null);
  const iconsRef = useRef(null);
  const navLinksRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarLinksRef = useRef([]);
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
        brandBarRef.current,
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.28",
      );
      tl.fromTo(
        logoRef.current,
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        "-=0.3",
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

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

      <header
        ref={headerRef}
        className="w-full bg-[#FFFDFB] font-serif shadow-sm"
      >
        {/* ===== LAYER 1 — TOP WINE UTILITY STRIP ===== */}
        <div ref={topBarRef} className="bg-[#62101F] text-[#F0D9CE]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-9 md:h-10">
              {/* Promo (left) */}
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.1em]">
                <Ruler size={13} className="shrink-0" />
                <span className="hidden sm:inline">
                  Free in-home measuring &amp; installation
                </span>
                <span className="sm:hidden">Free measuring &amp; install</span>
              </div>

              {/* Quick links + socials (right) — desktop only */}
              <div className="hidden md:flex items-center gap-4 text-[#E8C9BD]">
                {quickLinks.map((q) => (
                  <Link
                    key={q.to}
                    href={q.to}
                    className="text-[10.5px] uppercase tracking-[0.22em] transition-colors duration-200 hover:text-white"
                  >
                    {q.label}
                  </Link>
                ))}
                <span className="h-3 w-px bg-white/25" />
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="hover:text-white transition-colors"
                  >
                    <FaInstagram size={14} />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="hover:text-white transition-colors"
                  >
                    <FaFacebook size={14} />
                  </a>
                </div>
              </div>

              {/* Mobile quick links — compact */}
              <div className="flex md:hidden items-center gap-3 text-[#E8C9BD] text-[9px] uppercase tracking-[0.16em]">
                {quickLinks.map((q) => (
                  <Link
                    key={q.to}
                    href={q.to}
                    className="hover:text-white transition-colors"
                  >
                    {q.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== LAYER 2 — BRAND BAR (logo left, contact + quote right) ===== */}
        <div ref={brandBarRef} className="border-b border-[#E7DED5]">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-[68px] md:h-[88px]">
              {/* LOGO — left */}
              <Link ref={logoRef} href="/" className="flex items-center group">
                <img
                  src="/logo.png"
                  className="h-12 md:h-16 w-auto"
                  alt="Cozy Curtains"
                />
              </Link>

              {/* RIGHT — contact + quote (desktop) / hamburger (mobile) */}
              <div ref={iconsRef} className="flex items-center gap-3 sm:gap-5">
                {/* Phone block — desktop */}
                <div className="hidden lg:flex items-center gap-2.5 text-[#6B5D52]">
                  <Phone size={18} className="text-[#62101F]" />
                  <div className="leading-tight">
                    <div className="text-[9px] uppercase tracking-[0.16em] text-[#A8978A]">
                      Call us
                    </div>
                    <div className="text-[12px]">+977 1 555 0172</div>
                  </div>
                </div>

                {/* Search toggle — desktop */}
                <div ref={searchRef} className="relative hidden md:block">
                  <button
                    onClick={() => setSearchOpen((s) => !s)}
                    aria-label="Search"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#62101F] hover:bg-[#F3ECE4] transition-colors duration-200"
                  >
                    {searchOpen ? <X size={18} /> : <Search size={18} />}
                  </button>
                  {searchOpen && (
                    <div className="absolute right-0 top-12 w-72 bg-white border border-[#E7DED5] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-3 z-50">
                      <div className="flex items-center gap-2 bg-[#F3ECE4] rounded-lg px-3 h-10">
                        <Search size={15} className="text-[#62101F] shrink-0" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search curtains, fabrics…"
                          className="bg-transparent outline-none w-full text-sm text-[#2C2620]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Get Quote — desktop (filled wine, Variant C) */}
                <Link
                  href="/quote"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#62101F] px-5 py-2 text-[10px] uppercase tracking-[0.22em] text-[#FBF7F2] transition-all duration-200 hover:bg-[#4a0c17]"
                >
                  <Quote size={13} />
                  Get Quote
                </Link>

                {/* Quote pill (compact) + hamburger — mobile */}
                <Link
                  href="/quote"
                  className="md:hidden inline-flex items-center gap-1.5 rounded-full border border-[#62101F] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#62101F]"
                >
                  <Quote size={11} />
                  Quote
                </Link>
                <button
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                  className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[#62101F] text-[#FBF7F2] transition-colors duration-200"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LAYER 3 — BOTTOM PRIMARY NAV (pill active, Variant B) ===== */}
        <nav className="hidden md:block bg-[#FFFDFB] border-b border-[#E7DED5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ul
              ref={navLinksRef}
              className="flex items-center justify-center gap-2 lg:gap-3 h-[56px]"
            >
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className={`flex items-center gap-1.5 rounded-full px-4 lg:px-5 py-2 text-[11px] uppercase tracking-[0.22em] transition-all duration-300 ${
                      isActive(link.to)
                        ? "bg-[#62101F] text-[#FBF7F2]"
                        : "text-[#8A7A6D] hover:text-[#62101F] hover:bg-[#F3ECE4]"
                    }`}
                  >
                    {link.icon && <Home size={11} />}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* ===== STICKY NAV (compact: logo + pill nav + quote) ===== */}
      <div
        ref={stickyNavRef}
        className="fixed top-0 left-0 right-0 z-30 hidden md:block"
        style={{ transform: "translateY(-60px)", opacity: 0 }}
      >
        <div className="bg-[#FFFDFB]/95 backdrop-blur-md border-b border-[#E7DED5] shadow-[0_2px_20px_rgba(0,0,0,0.07)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="relative flex items-center h-[56px]">
              <Link
                ref={stickyLogoRef}
                href="/"
                className="absolute left-0 flex items-center group"
                style={{ opacity: 0, transform: "translateX(-40px)" }}
              >
                <img
                  src="/logo.png"
                  className="h-10 w-auto"
                  alt="Cozy Curtains"
                />
              </Link>

              <ul className="flex items-center justify-center gap-2 lg:gap-3 w-full">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] transition-all duration-300 ${
                        isActive(link.to)
                          ? "bg-[#62101F] text-[#FBF7F2]"
                          : "text-[#8A7A6D] hover:text-[#62101F] hover:bg-[#F3ECE4]"
                      }`}
                    >
                      {link.icon && <Home size={11} />}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/quote"
                className="absolute right-0 inline-flex items-center gap-1.5 rounded-full bg-[#62101F] px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#FBF7F2] transition-all duration-200 hover:bg-[#4a0c17]"
              >
                <Quote size={12} />
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE SIDEBAR (holds all primary nav) ===== */}
      <aside
        ref={sidebarRef}
        style={{ transform: "translateX(100%)" }}
        className="fixed top-0 right-0 z-50 h-full w-[82%] max-w-sm bg-[#FFFDFB] shadow-[0_10px_60px_rgba(0,0,0,0.18)]"
      >
        <div className="flex items-center justify-between px-6 h-[68px] bg-[#62101F] text-[#FBF7F2]">
          <div>
            <h2 className="text-xl tracking-[0.3em] font-light">COZY</h2>
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#E8C9BD] mt-0.5">
              Premium Curtains
            </p>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 border-b border-[#EFE6DC]">
          <div className="flex items-center gap-3 bg-[#F3ECE4] rounded-xl px-4 h-11">
            <Search size={16} className="text-[#62101F] shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm text-[#2C2620]"
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
              className={`flex items-center justify-between h-[56px] px-2 border-b border-[#EFE6DC] uppercase tracking-[0.2em] text-[12px] transition-colors ${
                isActive(link.to)
                  ? "text-[#62101F] font-medium"
                  : "text-[#8A7A6D] hover:text-[#62101F]"
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon && <Home size={14} />}
                <span>{link.label}</span>
              </div>
              <ChevronRight size={14} className="text-[#C9B8A8]" />
            </Link>
          ))}
        </div>

        {/* Quick links inside drawer */}
        <div className="px-5 pt-2 pb-1 flex flex-wrap gap-x-5 gap-y-2">
          {quickLinks.map((q) => (
            <Link
              key={q.to}
              href={q.to}
              onClick={() => setMenuOpen(false)}
              className="text-[10px] uppercase tracking-[0.18em] text-[#A8978A] hover:text-[#62101F] transition-colors"
            >
              {q.label}
            </Link>
          ))}
        </div>

        {/* MOBILE SIDEBAR CTA */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-[#EFE6DC] bg-[#FFFDFB]">
          <Link
            href="/quote"
            onClick={() => setMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 h-12 bg-[#62101F] text-[#FBF7F2] uppercase tracking-[0.32em] text-[11px] hover:bg-[#4a0c17] transition-colors duration-200 rounded-full"
          >
            <Quote size={13} />
            Get Quote
          </Link>
        </div>
      </aside>
    </>
  );
}

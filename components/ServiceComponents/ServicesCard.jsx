"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
// Swap `video` for your own files (mp4/webm). `poster` shows while the video loads.

const ROOMS = [
  {
    kicker: "For your",
    title: "Living Room",
    body: "Full-length curtains in linen or velvet add height and drama, with sheers layered underneath for flexible daytime light.",
    video: "/videos/living-room.mp4",
    poster: "/images/living-room.jpg",
  },
  {
    kicker: "For your",
    title: "Bedroom",
    body: "Blackout or dim-out linings for better sleep, with neat Roman blinds or interlined curtains for warmth and quiet.",
    video: "/videos/bedroom.mp4",
    poster: "/images/bedroom.jpg",
  },
  {
    kicker: "For your",
    title: "Kitchen",
    body: "Practical, wipe-clean roller blinds in moisture-resistant fabrics that stack neatly and stand up to daily use.",
    video: "/videos/kitchen.mp4",
    poster: "/images/kitchen.jpg",
  },
  {
    kicker: "For your",
    title: "Home Office",
    body: "Dim-out blinds that cut screen glare without darkening the room, in calm neutral tones to keep you focused.",
    video: "/videos/home-office.mp4",
    poster: "/images/home-office.jpg",
  },
  {
    kicker: "For your",
    title: "Bay Windows",
    body: "Curtains and blinds fitted to follow the angle of the bay cleanly — bent tracks or individual recess treatments.",
    video: "/videos/bay-windows.mp4",
    poster: "/images/bay-windows.jpg",
  },
];

const DURATION = 6000; // ms per slide
const EASE = [0.22, 1, 0.36, 1];

export default function ServicesCard() {
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { margin: "-15%" });

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1 for the active segment

  const videoRefs = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(null);
  const elapsedRef = useRef(0);

  const active = playing && inView; // only advance + play when visible

  // Reset progress whenever the active slide changes
  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [index]);

  // Drive the fixed-duration progress + auto-advance
  useEffect(() => {
    if (!active) {
      lastRef.current = null;
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const loop = (t) => {
      if (lastRef.current == null) lastRef.current = t;
      elapsedRef.current += t - lastRef.current;
      lastRef.current = t;

      const p = Math.min(elapsedRef.current / DURATION, 1);
      setProgress(p);

      if (p >= 1) {
        setIndex((i) => (i + 1) % ROOMS.length);
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [active, index]);

  // Play / pause the videos to match active state
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && active) {
        const playPromise = v.play();
        if (playPromise) playPromise.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, active]);

  const goTo = (i) => {
    elapsedRef.current = 0;
    lastRef.current = null;
    setProgress(0);
    setIndex((i + ROOMS.length) % ROOMS.length);
  };

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  // Swipe / drag to change slide
  const dragStartX = useRef(null);
  const onPointerDown = (e) => {
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (dragStartX.current == null) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1));
    dragStartX.current = null;
  };

  return (
    <section className="bg-[#f7f7f5] px-5 py-16 md:px-10 lg:px-16">
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap"
        rel="stylesheet"
      />

      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-8 max-w-xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#62101F]">
            Find Your Fit
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-black md:text-[2.1rem]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The Right Treatment for Every Room
          </h2>
        </div>

        {/* Stage */}
        <div
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="relative h-[460px] w-full select-none overflow-hidden rounded-[22px] bg-[#1a1412] md:h-[520px]"
          style={{ touchAction: "pan-y" }}
        >
          {/* Videos (crossfade) */}
          {ROOMS.map((room, i) => (
            <video
              key={room.title}
              ref={(el) => (videoRefs.current[i] = el)}
              src={room.video}
              poster={room.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{ opacity: i === index ? 1 : 0 }}
            />
          ))}

          {/* Bottom-up dark gradient */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,6,5,.92) 0%, rgba(10,6,5,.55) 32%, rgba(10,6,5,.05) 60%, transparent 100%)",
            }}
          />

          {/* Arrow navigation */}
          <button
            onClick={goPrev}
            aria-label="Previous room"
            className="absolute left-4 top-1/2 z-10 hidden md:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            style={{
              background: "rgba(20,12,10,.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next room"
            className="absolute right-4 top-1/2 z-10 hidden md:flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            style={{
              background: "rgba(20,12,10,.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            <ChevronRight size={22} />
          </button>

          {/* Top label */}
          <div className="absolute left-6 top-6 flex items-center gap-2 text-white/80">
            <span className="text-xs font-medium uppercase tracking-[0.18em]">
              Room by room
            </span>
          </div>

          {/* Text — animates in on each slide change */}
          <div className="absolute inset-x-0 bottom-[96px] px-8">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#E8B4A0]">
                {ROOMS[index].kicker}
              </p>
              <h3
                className="mb-2.5 text-3xl font-bold leading-tight text-white md:text-4xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {ROOMS[index].title}
              </h3>
              <p className="max-w-md text-sm leading-7 text-white/70">
                {ROOMS[index].body}
              </p>
            </motion.div>
          </div>

          {/* Progress pill */}
          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <div
              className="flex items-center gap-4 rounded-full border border-white/10 px-4 py-2.5"
              style={{
                background: "rgba(20,12,10,.55)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center gap-2.5">
                {ROOMS.map((room, i) => {
                  const isActive = i === index;
                  const fill = isActive ? progress * 100 : i < index ? 100 : 0;
                  return (
                    <button
                      key={room.title}
                      onClick={() => goTo(i)}
                      aria-label={`Go to ${room.title}`}
                      className="relative h-1 overflow-hidden rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 40 : 8,
                        background: "rgba(255,255,255,.28)",
                      }}
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-white"
                        style={{ width: `${fill}%` }}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-[#1a1412]"
              >
                {playing ? (
                  <Pause size={15} />
                ) : (
                  <Play size={15} className="ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

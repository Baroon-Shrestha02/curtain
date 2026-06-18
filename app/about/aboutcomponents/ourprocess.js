"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Ruler, Scissors, Layers, CheckCircle2 } from "lucide-react";

/* ── THREE.JS FABRIC CANVAS ── */
const FabricCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let rafId,
      renderer,
      scene,
      camera,
      fabric,
      material,
      motes = [];

    const init = (THREE) => {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(el.offsetWidth, el.offsetHeight);
      el.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        55,
        el.offsetWidth / el.offsetHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0, 7);

      const geometry = new THREE.PlaneGeometry(18, 12, 90, 60);
      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uGold: { value: new THREE.Color(0xc19d53) },
          uCream: { value: new THREE.Color(0xf5f0e8) },
          uLight: { value: new THREE.Color(0xede6d6) },
        },
        vertexShader: `
          uniform float uTime;
          varying float vWave;
          varying vec2  vUv;
          varying float vLight;
          void main() {
            vUv = uv;
            vec3 p = position;
            float w = sin(p.x * 0.7 + uTime * 0.45) * 0.28
                    + sin(p.y * 1.1 + uTime * 0.30) * 0.18
                    + cos(p.x * 0.4 + p.y * 0.6 + uTime * 0.22) * 0.20;
            float gravity = -pow(uv.y - 1.0, 2.0) * 0.35;
            p.z += w + gravity;
            float dzdx = cos(p.x * 0.7 + uTime * 0.45) * 0.196;
            vLight = 0.55 + dzdx * 0.45;
            vWave  = p.z * 0.5 + 0.5;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3  uGold;
          uniform vec3  uCream;
          uniform vec3  uLight;
          varying float vWave;
          varying float vLight;
          varying vec2  vUv;
          void main() {
            float stripeH = step(0.48, mod(vUv.x * 22.0, 1.0));
            float stripeV = step(0.48, mod(vUv.y * 40.0, 1.0));
            float weave   = mix(0.92, 1.0, stripeH * 0.5 + stripeV * 0.5);
            float fadeX   = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
            float fadeY   = smoothstep(0.0, 0.06, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
            float gold    = smoothstep(0.62, 0.85, vWave) * stripeH * 0.6;
            vec3 col = mix(uLight, uCream, vLight * weave);
            col = mix(col, uGold, gold * 0.35);
            gl_FragColor = vec4(col, fadeX * fadeY * 0.30);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      fabric = new THREE.Mesh(geometry, material);
      fabric.rotation.x = -0.06;
      scene.add(fabric);

      for (let i = 0; i < 30; i++) {
        const m = new THREE.Mesh(
          new THREE.SphereGeometry(0.015 + Math.random() * 0.02, 5, 5),
          new THREE.MeshBasicMaterial({
            color: 0xc19d53,
            transparent: true,
            opacity: 0.05 + Math.random() * 0.08,
          }),
        );
        m.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 3,
        );
        m.userData = {
          vy: 0.005 + Math.random() * 0.005,
          phase: Math.random() * Math.PI * 2,
        };
        scene.add(m);
        motes.push(m);
      }

      let mx = 0,
        my = 0;
      const onMove = (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.28;
        my = -(e.clientY / window.innerHeight - 0.5) * 0.16;
      };
      const onResize = () => {
        renderer.setSize(el.offsetWidth, el.offsetHeight);
        camera.aspect = el.offsetWidth / el.offsetHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("resize", onResize);

      let t = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        t += 0.01;
        material.uniforms.uTime.value = t;
        fabric.rotation.y += (mx - fabric.rotation.y) * 0.025;
        fabric.rotation.x += (-0.06 + my - fabric.rotation.x) * 0.025;
        motes.forEach((m) => {
          m.position.y += m.userData.vy;
          if (m.position.y > 8) {
            m.position.y = -8;
            m.position.x = (Math.random() - 0.5) * 20;
          }
        });
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
      };
    };

    let cleanup;
    if (window.THREE) {
      cleanup = init(window.THREE);
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = () => {
        cleanup = init(window.THREE);
      };
      document.head.appendChild(script);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (cleanup) cleanup();
      if (renderer) {
        renderer.dispose();
        if (el.contains(renderer.domElement))
          el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
      }}
    />
  );
};

/* ── PROCESS CARD ── */
const ProcessCard = ({ icon: Icon, title, description, num, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "30px 26px 36px",
        background: hovered ? "#FFFFFF" : "#F9F7F3",
        border: `1px solid ${hovered ? "rgba(193,157,83,0.38)" : "#E5E0D5"}`,
        minHeight: 300,
        overflow: "hidden",
        transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
        boxShadow: hovered
          ? "0 20px 48px rgba(193,157,83,0.12), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 8,
          right: 14,
          fontFamily: "'Cormorant Garamond','Georgia',serif",
          fontSize: 80,
          fontWeight: 300,
          lineHeight: 1,
          color: hovered ? "rgba(193,157,83,0.16)" : "rgba(193,157,83,0.07)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          transition: "color 0.4s",
        }}
      >
        {num}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              background: hovered ? "#C19D53" : "#FFFFFF",
              border: `1px solid ${hovered ? "#C19D53" : "#E5E0D5"}`,
              transition: "background 0.38s, border-color 0.38s",
            }}
          >
            <Icon
              size={18}
              strokeWidth={1.4}
              color={hovered ? "#FFFFFF" : "#C19D53"}
              style={{ transition: "color 0.38s" }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Jost',sans-serif",
              fontSize: 9,
              fontWeight: 400,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "#B8B2AC",
            }}
          >
            Phase {num}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond','Georgia',serif",
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 1.18,
            margin: 0,
            letterSpacing: "0.01em",
            color: hovered ? "#C19D53" : "#1A1B1C",
            transition: "color 0.35s",
          }}
        >
          {title}
        </h3>

        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, #C19D53, rgba(193,157,83,0.06))",
          }}
        />

        <p
          style={{
            fontFamily: "'Jost',sans-serif",
            fontSize: 12.5,
            fontWeight: 300,
            lineHeight: 1.82,
            color: "#6B6560",
            letterSpacing: "0.015em",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "#E5E0D5",
          zIndex: 5,
        }}
      >
        <div
          style={{
            height: "100%",
            background: "#C19D53",
            width: hovered ? "100%" : "0%",
            transition: "width 0.55s ease",
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── CONSULTATION BUTTON ── */
const ConsultationButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        fontFamily: "'Jost',sans-serif",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        padding: "16px 32px",
        background: hovered ? "#C19D53" : "transparent",
        color: hovered ? "#FFFFFF" : "#C19D53",
        border: "1px solid #C19D53",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      Begin Consultation
    </motion.a>
  );
};

/* ── MAIN EXPORT ── */
export default function ProcessSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  const processSteps = [
    {
      num: "01",
      icon: Ruler,
      title: "Laser Measurement",
      description:
        "Our technicians utilize high-precision laser scanning to map your space, ensuring flawless integrity.",
    },
    {
      num: "02",
      icon: Scissors,
      title: "Fabric Curation",
      description:
        "We navigate you through a global library of premium textiles vetted for thermal efficiency.",
    },
    {
      num: "03",
      icon: Layers,
      title: "Artisan Fabrication",
      description:
        "Your treatments are hand-crafted in our boutique workshop with reinforced weighted hems.",
    },
    {
      num: "04",
      icon: CheckCircle2,
      title: "White-Glove Fitting",
      description:
        "The transformation concludes with our master installation and final aesthetic steam.",
    },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');`}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          background: "#FFFFFF",
          overflow: "hidden",
          padding: "clamp(60px, 10vw, 96px) 5vw",
        }}
      >
        <FabricCanvas />

        <motion.div
          style={{
            y: bgY,
            position: "relative",
            zIndex: 10,
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              marginBottom: 64,
            }}
          >
            <motion.div
              style={{
                height: 1,
                background: "linear-gradient(to right, #C19D53, transparent)",
                width: 100,
              }}
            />
            <motion.h2
              style={{
                fontFamily: "'Cormorant Garamond','Georgia',serif",
                fontSize: "clamp(36px, 8vw, 72px)",
                fontWeight: 300,
                lineHeight: 0.9,
                color: "#1A1B1C",
                margin: 0,
              }}
            >
              Our{" "}
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#C19D53",
                }}
              >
                Process
              </em>
            </motion.h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {processSteps.map((step, i) => (
              <ProcessCard key={step.num} {...step} index={i} />
            ))}
          </div>

          <div
            style={{
              marginTop: 64,
              display: "flex",
              justifyContent: "center",
              md: { justifyContent: "flex-start" },
            }}
          >
            <ConsultationButton />
          </div>
        </motion.div>
      </section>
    </>
  );
}

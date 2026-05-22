import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Toaster, toast } from "sonner";
import { SpatialScene } from "@/components/SpatialScene";
import { joinWaitlist } from "@/lib/waitlist.functions";
import fallbackImage from "@/assets/spatial-fallback.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurora OS — Spatial operating system for ambient computing" },
      {
        name: "description",
        content:
          "Aurora OS is a gesture-first, multi-window spatial operating system. 60fps everywhere, sub-millisecond input, built for the ambient age.",
      },
      { property: "og:title", content: "Aurora OS — OS for the Ambient Age" },
      {
        property: "og:description",
        content: "Spatial operating system. Gesture-first. Multi-window. 60fps everywhere.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: fallbackImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip relative">
      <ScrollProgress />
      <GlowCursor />

      {/* Ambient aurora backdrop */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-accent-mint/15 blur-[160px] rounded-full animate-aurora" />
        <div
          className="absolute top-1/3 -right-1/4 w-[80%] h-[80%] bg-accent-purple/15 blur-[180px] rounded-full animate-aurora"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[60%] h-[60%] bg-accent-mint/10 blur-[200px] rounded-full animate-aurora"
          style={{ animationDelay: "-10s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.025] animate-grid"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Nav />
      <Hero />
      <LogoMarquee />
      <Bento />
      <AppShowcase />
      <Gestures />
      <DevSDK />
      <Specs />
      <Timeline />
      <Testimonial />
      <Pricing />
      <FAQ />
      <CTA />
      <SiteFooter />
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgba(20,22,40,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
            backdropFilter: "blur(12px)",
          },
        }}
      />
    </div>
  );
}

/* ============================================================ */
/*  Global UI primitives                                        */
/* ============================================================ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-linear-to-r from-accent-mint via-accent-purple to-accent-mint origin-left z-60"
    />
  );
}

function GlowCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 size-100 rounded-full pointer-events-none z-0 mix-blend-screen opacity-60"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--accent-mint) 22%, transparent) 0%, transparent 60%)",
        transition: "transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-mint">
      {children}
    </div>
  );
}

/* ============================================================ */
/*  Nav                                                          */
/* ============================================================ */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 backdrop-blur-md bg-background/40 border-b border-glass-border">
      <a href="#" className="flex items-center gap-2.5">
        <div className="relative">
          <div className="size-3 rounded-full bg-accent-mint shadow-[0_0_14px_rgba(110,255,192,0.7)]" />
          <div className="absolute inset-0 size-3 rounded-full bg-accent-mint animate-ping opacity-40" />
        </div>
        <span className="font-semibold tracking-tight text-lg">AURORA</span>
        <span className="font-mono text-[10px] text-muted ml-2 tracking-widest hidden sm:inline">
          v1.0 · BUILD 24A19
        </span>
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium text-muted">
        <a href="#architecture" className="hover:text-foreground transition-colors">
          Architecture
        </a>
        <a href="#apps" className="hover:text-foreground transition-colors">
          Apps
        </a>
        <a href="#input" className="hover:text-foreground transition-colors">
          Input
        </a>
        <a href="#sdk" className="hover:text-foreground transition-colors">
          SDK
        </a>
        <a href="#pricing" className="hover:text-foreground transition-colors">
          Pricing
        </a>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-glass-border bg-glass text-xs font-mono text-muted hover:text-foreground hover:border-accent-mint/40 transition-colors"
        >
          <span>⌘K</span>
          <span className="hidden lg:inline">Search</span>
        </button>
        <a
          href="#cta"
          className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-bold hover:scale-105 transition-transform"
        >
          Pre-order
        </a>
      </div>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </nav>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.querySelector<HTMLInputElement>("#cmdk-input")?.focus();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const items = [
    { label: "Architecture overview", hint: "Section" },
    { label: "Try the demo", hint: "Action" },
    { label: "Aurora SDK · TypeScript", hint: "Docs" },
    { label: "Pricing & cohorts", hint: "Section" },
    { label: "Roadmap to 2027", hint: "Section" },
    { label: "Join the waitlist", hint: "Action" },
  ].filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-background/80 backdrop-blur-md flex items-start justify-center pt-32"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl mx-4 rounded-2xl bg-card/90 border border-glass-border shadow-2xl overflow-hidden"
          >
            <input
              id="cmdk-input"
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search anything…"
              className="w-full px-6 py-5 bg-transparent border-b border-glass-border outline-none text-base placeholder:text-muted/50"
            />
            <ul className="py-2 max-h-80 overflow-auto">
              {items.length === 0 && <li className="px-6 py-6 text-sm text-muted">No results.</li>}
              {items.map((i) => (
                <li
                  key={i.label}
                  className="flex items-center justify-between px-6 py-3 hover:bg-glass cursor-pointer"
                >
                  <span className="text-sm">{i.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {i.hint}
                  </span>
                </li>
              ))}
            </ul>
            <div className="px-6 py-3 border-t border-glass-border flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>↑↓ navigate</span>
              <span>esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================ */
/*  Hero                                                          */
/* ============================================================ */

function Hero() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-20 relative">
      <motion.header
        style={{ y: heroY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        className="text-center mb-20 md:mb-28"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-glass border border-glass-border mb-8">
          <span className="size-1.5 rounded-full bg-accent-mint animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Ambient Computing · Now in private beta
          </span>
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-[9rem] font-semibold tracking-[-0.04em] leading-[0.9] text-balance">
          OS for the
          <br />
          <span
            className="text-transparent bg-clip-text bg-linear-to-r from-foreground via-accent-mint to-foreground/30 bg-size-[200%_auto] animate-shimmer"
            style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400 }}
          >
            Ambient Age
          </span>
        </h1>
        <p className="max-w-xl mx-auto mt-8 text-lg text-muted text-pretty leading-relaxed">
          A spatial operating system that disappears when you don't need it. Gesture-first,
          multi-window, 60fps everywhere — at the speed of thought.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#cta"
            className="px-7 py-3.5 rounded-full bg-foreground text-background text-sm font-bold hover:scale-[1.04] active:scale-[0.98] transition-transform inline-flex items-center gap-2"
          >
            Request access
            <span aria-hidden>→</span>
          </a>
          <a
            href="#apps"
            className="px-7 py-3.5 rounded-full border border-glass-border bg-glass text-sm font-medium hover:border-accent-mint/40 transition-colors"
          >
            Watch the keynote · 04:12
          </a>
        </div>
      </motion.header>

      {/* The signature 3D moment */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative"
      >
        <div className="relative z-20 group">
          <div className="w-full aspect-video rounded-3xl bg-glass border border-glass-border backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/5 relative">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-glass-border relative z-10 bg-background/20 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="size-2.5 rounded-full bg-white/15" />
                <div className="size-2.5 rounded-full bg-white/15" />
                <div className="size-2.5 rounded-full bg-white/15" />
              </div>
              <div className="font-mono text-[10px] text-muted tracking-[0.2em]">
                WORKSPACE_01 // 40.7128° N 74.0060° W
              </div>
              <div className="font-mono text-[10px] text-accent-mint flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent-mint animate-pulse" /> LIVE
              </div>
            </div>
            {/* Fallback image behind canvas */}
            <img
              src={fallbackImage}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            {/* 3D scene */}
            <div className="absolute inset-0 top-13">
              <SpatialScene />
            </div>

            {/* Scan line */}
            <div className="absolute inset-x-0 top-13 bottom-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-accent-mint/60 to-transparent animate-scan" />
            </div>
          </div>

          {/* Floating mini-panel */}
          <div
            className="hidden md:block absolute -top-12 -right-8 w-64 aspect-square rounded-2xl bg-glass border border-glass-border backdrop-blur-xl -z-10 animate-float"
            style={{ animationDelay: "-2s" }}
          >
            <div className="p-6">
              <div className="h-1 w-12 bg-accent-mint rounded-full mb-4" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                Active Process
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-white/8 rounded" />
                <div className="h-2 w-4/5 bg-white/8 rounded" />
                <div className="h-2 w-3/5 bg-accent-mint/30 rounded" />
              </div>
            </div>
          </div>

          {/* Depth indicators */}
          <div className="absolute -bottom-12 left-4 md:left-12 font-mono text-[10px] text-accent-mint/70 space-y-1">
            <div>Z-AXIS: 440mm</div>
            <div>LATENCY: 1.2ms</div>
            <div>REFRESH: 120Hz</div>
          </div>
          <div className="absolute -bottom-12 right-4 md:right-12 font-mono text-[10px] text-muted/60 space-y-1 text-right">
            <div>SCENE: NEURAL_COMPOSITOR</div>
            <div>FRAME: 00:00:01.247</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================ */
/*  Logo marquee                                                  */
/* ============================================================ */

function LogoMarquee() {
  const logos = [
    "STRIPE",
    "FIGMA",
    "LINEAR",
    "VERCEL",
    "ARC",
    "NOTION",
    "RAYCAST",
    "FRAMER",
    "PERPLEXITY",
    "REPLIT",
    "RESEND",
    "LOOPS",
  ];
  return (
    <section className="pt-28 pb-12 border-y border-glass-border bg-background/40 backdrop-blur-sm overflow-hidden">
      <div className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted mb-8">
        Trusted by teams shipping the next era of software
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-16 w-max animate-marquee">
          {[...logos, ...logos].map((l, i) => (
            <span
              key={i}
              className="font-semibold text-2xl md:text-3xl tracking-[0.15em] text-muted/60 hover:text-foreground transition-colors whitespace-nowrap"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Bento                                                        */
/* ============================================================ */

function Bento() {
  return (
    <section id="architecture" className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <SectionLabel>02 · Architecture</SectionLabel>
      <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl">
        An OS that thinks in{" "}
        <em style={{ fontFamily: "Instrument Serif" }} className="text-accent-mint not-italic">
          three dimensions
        </em>
        .
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="grid grid-cols-12 gap-6 mt-12"
      >
        <div className="col-span-12 md:col-span-7 rounded-3xl bg-glass border border-glass-border p-10 group hover:border-accent-mint/30 transition-colors relative overflow-hidden">
          <h3 className="text-3xl font-medium mb-4 group-hover:text-accent-mint transition-colors">
            Kinetic Fluidity
          </h3>
          <p className="text-muted leading-relaxed max-w-md">
            Our engine predicts your trajectory and renders transitions before you complete the
            gesture. Zero perceptible lag. Pure intent.
          </p>
          <div className="mt-12 h-40 relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-linear-to-r from-accent-mint/20 via-accent-mint/5 to-transparent blur-2xl rounded-full w-2/3 h-full" />
            <div className="relative font-mono text-5xl md:text-6xl font-medium tracking-tight text-foreground/90">
              000.12<span className="text-accent-mint">ms</span>
            </div>
            <div className="absolute bottom-4 left-0 font-mono text-[10px] uppercase tracking-widest text-muted">
              End-to-end input → photon
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 rounded-3xl bg-glass border border-glass-border p-10 group hover:border-accent-purple/30 transition-colors">
          <h3 className="text-3xl font-medium mb-4 group-hover:text-accent-purple transition-colors">
            Ambient Audio
          </h3>
          <p className="text-muted leading-relaxed">
            Spatial soundscapes that anchor your workspace in physical reality.
          </p>
          <div className="mt-8 flex items-end gap-1.5 h-24">
            {[0.5, 1, 0.65, 0.35, 0.8, 0.45, 0.9, 0.55, 0.7, 0.4, 0.85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t origin-bottom animate-bar"
                style={{
                  height: `${h * 100}%`,
                  background:
                    i === 4
                      ? "var(--accent-purple)"
                      : i === 7
                        ? "var(--accent-mint)"
                        : "rgba(255,255,255,0.12)",
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
          <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
            7.1.4 Spatial · HRTF · 48kHz
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 rounded-3xl bg-glass border border-glass-border p-8 hover:border-accent-mint/30 transition-colors">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            Volumetric Compositor
          </div>
          <div className="text-xl font-medium leading-snug">
            Infinite z-depth windows with zero buffer conflict.
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 rounded-3xl bg-glass border border-glass-border p-8 hover:border-accent-mint/30 transition-colors">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            Ambient Persistence
          </div>
          <div className="text-xl font-medium leading-snug">
            Windows stay locked to physical coordinates across sessions.
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 rounded-3xl bg-glass border border-glass-border p-8 hover:border-accent-mint/30 transition-colors">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            Neural Input
          </div>
          <div className="text-xl font-medium leading-snug">
            Sub-millimeter tracking. Multi-modal sensor fusion.
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================ */
/*  App showcase tabs                                            */
/* ============================================================ */

function AppShowcase() {
  const tabs = [
    {
      id: "compose",
      name: "Compose",
      tag: "Spatial canvas",
      desc: "Pin reference material to physical walls. Drag thoughts between depths. Compose at the speed of thought.",
      body: (
        <div className="grid grid-cols-3 gap-3 h-full">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-glass border border-glass-border p-3 animate-float"
              style={{ animationDelay: `${i * -0.4}s` }}
            >
              <div className="h-1 w-8 bg-accent-mint/60 rounded-full mb-2" />
              <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-white/8 rounded" />
                <div className="h-1.5 w-3/4 bg-white/8 rounded" />
                <div className="h-1.5 w-1/2 bg-white/8 rounded" />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "focus",
      name: "Focus",
      tag: "Deep work mode",
      desc: "Dim the world. Hide notifications. Spatial cocoon mode that responds to your heart rate and gaze.",
      body: (
        <div className="flex items-center justify-center h-full relative">
          <div className="absolute size-48 rounded-full border border-accent-mint/30 animate-aurora" />
          <div
            className="absolute size-32 rounded-full border border-accent-mint/50"
            style={{ animationDelay: "-3s" }}
          />
          <div className="absolute size-16 rounded-full bg-accent-mint/20 backdrop-blur-md flex items-center justify-center font-mono text-xs text-accent-mint">
            ◉
          </div>
        </div>
      ),
    },
    {
      id: "presence",
      name: "Presence",
      tag: "Multi-user spatial",
      desc: "Codename Presence brings collaborators into your room as volumetric holograms. Real eye-contact. Real spatial audio.",
      body: (
        <div className="flex items-end justify-around h-full pb-4">
          {["AL", "JK", "MR", "VP"].map((n, i) => (
            <div
              key={n}
              className="flex flex-col items-center gap-2 animate-float"
              style={{ animationDelay: `${i * -0.5}s` }}
            >
              <div className="size-14 rounded-full bg-linear-to-br from-accent-mint/40 to-accent-purple/40 border border-glass-border backdrop-blur-md flex items-center justify-center font-mono text-xs font-bold">
                {n}
              </div>
              <div className="font-mono text-[9px] text-muted uppercase tracking-widest">{n}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "memory",
      name: "Memory",
      tag: "Persistent context",
      desc: "Every window remembers where it was. Every thought stays exactly where you left it — across days, devices, and rooms.",
      body: (
        <div className="grid grid-cols-2 gap-3 h-full">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl bg-glass border border-glass-border p-4 flex flex-col justify-between"
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted">
                Session {i}
              </div>
              <div className="font-mono text-xs text-accent-mint">
                {i * 17 + 2}.{i * 4 + 1}.4 GB
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="apps" className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <SectionLabel>03 · Apps</SectionLabel>
      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-xl">
          Built-in apps, redesigned for space.
        </h2>
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === t.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-glass border-glass-border text-muted hover:text-foreground"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-glass border border-glass-border p-6 md:p-10 grid md:grid-cols-2 gap-10 min-h-105">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent-mint mb-4">
                {current.tag}
              </div>
              <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                {current.name}
              </h3>
              <p className="text-lg text-muted leading-relaxed max-w-md">{current.desc}</p>
            </div>
            <div className="mt-8 flex gap-6 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>↗ Open in workspace</span>
              <span className="text-accent-mint">
                ⌘{tabs.findIndex((t) => t.id === current.id) + 1}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          key={current.id + "-visual"}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative rounded-2xl bg-background/60 border border-glass-border overflow-hidden p-6 min-h-70"
        >
          <div className="absolute -top-20 -right-20 size-40 bg-accent-mint/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-20 -left-20 size-40 bg-accent-purple/15 blur-3xl rounded-full" />
          <div className="relative h-full">{current.body}</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Gestures                                                     */
/* ============================================================ */

function Gestures() {
  const gestures = [
    {
      name: "Pinch",
      code: "GST_001",
      desc: "Grab any window from any depth. Tactile resistance scales with mass.",
      path: "M10 60 Q 30 20, 60 30 T 110 50",
    },
    {
      name: "Flick",
      code: "GST_002",
      desc: "Send content across workspaces. Trajectory-aware compositor.",
      path: "M10 50 Q 50 50, 80 30 L 110 20",
    },
    {
      name: "Expand",
      code: "GST_003",
      desc: "Reveal layered context. Five fingers, three dimensions.",
      path: "M60 60 L 10 20 M60 60 L 110 20 M60 60 L 60 10",
    },
  ];
  return (
    <section id="input" className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <SectionLabel>04 · Input</SectionLabel>
      <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl">
        Your hands are the cursor.
      </h2>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {gestures.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-3xl bg-glass border border-glass-border p-8 group hover:border-accent-mint/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent-mint">
                {g.code}
              </div>
              <div className="font-mono text-[10px] text-muted">3 dof</div>
            </div>
            <svg viewBox="0 0 120 70" className="w-full h-32 mb-6">
              <path
                d={g.path}
                stroke={`url(#grad-${i})`}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <defs>
                <linearGradient id={`grad-${i}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--accent-mint)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--accent-mint)" />
                </linearGradient>
              </defs>
              <circle
                cx={
                  g.path
                    .match(/L (\d+)/g)
                    ?.slice(-1)[0]
                    .split(" ")[1] || "110"
                }
                cy="20"
                r="2.5"
                fill="var(--accent-mint)"
                className="animate-pulse"
              />
            </svg>
            <h3 className="text-2xl font-medium mb-2">{g.name}</h3>
            <p className="text-sm text-muted leading-relaxed">{g.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Developer SDK                                                */
/* ============================================================ */

function DevSDK() {
  const lines = [
    { t: "import", v: "import { createWindow, useGesture } from " },
    { t: "string", v: `"@aurora/sdk";` },
    { t: "blank", v: "" },
    { t: "comment", v: "// Spawn a window at 2m depth, anchored to physical space" },
    { t: "code", v: "const panel = createWindow({" },
    { t: "code", v: '  title: "Inbox",' },
    { t: "code", v: '  anchor: "world",' },
    { t: "code", v: "  position: { x: 0, y: 1.4, z: 2.0 }," },
    { t: "code", v: '  surface: "frosted",' },
    { t: "code", v: "});" },
    { t: "blank", v: "" },
    { t: "code", v: 'useGesture("pinch", (e) => panel.grab(e.hand));' },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <SectionLabel>05 · SDK</SectionLabel>
      <div className="mt-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            One SDK.
            <br />
            <span style={{ fontFamily: "Instrument Serif" }} className="italic text-accent-mint">
              Every surface.
            </span>
          </h2>
          <p className="text-lg text-muted leading-relaxed max-w-md mb-8">
            Write once in TypeScript. Aurora compiles to spatial windows, AR overlays, handheld
            surfaces, and even legacy 2D. No platform lock-in. No re-writes.
          </p>
          <div className="flex flex-wrap gap-3">
            {["TypeScript", "Swift", "Rust", "Python"].map((l) => (
              <span
                key={l}
                className="px-3 py-1.5 rounded-full bg-glass border border-glass-border font-mono text-xs text-muted"
              >
                {l}
              </span>
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-accent-mint hover:gap-3 transition-all"
          >
            Read the docs <span aria-hidden>→</span>
          </a>
        </div>

        <div className="rounded-2xl bg-background/80 border border-glass-border overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border bg-glass/50">
            <div className="size-2.5 rounded-full bg-white/15" />
            <div className="size-2.5 rounded-full bg-white/15" />
            <div className="size-2.5 rounded-full bg-white/15" />
            <span className="ml-auto font-mono text-[10px] text-muted tracking-widest">
              app.ts · TypeScript
            </span>
          </div>
          <pre className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
            {lines.map((l, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-muted/40 select-none w-6 text-right">{i + 1}</span>
                <code
                  className={
                    l.t === "comment"
                      ? "text-muted/60 italic"
                      : l.t === "string"
                        ? "text-accent-mint"
                        : l.t === "import"
                          ? "text-accent-purple"
                          : "text-foreground/90"
                  }
                >
                  {l.v}
                  {i === lines.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-accent-mint ml-1 align-middle animate-caret" />
                  )}
                </code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Specs                                                        */
/* ============================================================ */

function Specs() {
  const stats = [
    { value: "60", unit: "fps", label: "Everywhere, always" },
    { value: "1.2", unit: "ms", label: "Motion-to-photon" },
    { value: "∞", unit: "", label: "Window depth" },
    { value: "12", unit: "sensors", label: "Tracking fusion" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-glass-border">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="border-b md:border-b-0 md:border-r border-glass-border last:border-r-0 py-10 px-6 first:pl-0"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">
              {s.label}
            </div>
            <div className="font-medium text-5xl md:text-6xl tracking-tighter">
              {s.value}
              {s.unit && (
                <span className="text-2xl text-muted ml-1 font-mono font-normal">{s.unit}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Timeline / Roadmap                                           */
/* ============================================================ */

function Timeline() {
  const events = [
    { date: "Q1 · 2026", title: "Aurora Core 1.0", desc: "Compositor, gesture engine, SDK alpha." },
    { date: "Q3 · 2026", title: "Presence", desc: "Volumetric collaboration, spatial audio." },
    { date: "Q1 · 2027", title: "Hardware reference", desc: "Aurora Lens — 4K per eye, 120Hz." },
    { date: "Q4 · 2027", title: "Public release", desc: "Cohort 02 ships worldwide." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <SectionLabel>06 · Roadmap</SectionLabel>
      <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl">
        Where we're going.
      </h2>
      <div className="mt-16 relative">
        <div className="absolute top-3 left-0 right-0 h-px bg-glass-border hidden md:block" />
        <div className="grid md:grid-cols-4 gap-10">
          {events.map((e, i) => (
            <motion.div
              key={e.date}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <div className="size-2.5 rounded-full bg-accent-mint shadow-[0_0_12px_rgba(110,255,192,0.6)] mb-6 ml-0.5 md:ml-0" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-accent-mint mb-3">
                {e.date}
              </div>
              <div className="text-xl font-medium mb-2">{e.title}</div>
              <div className="text-sm text-muted leading-relaxed">{e.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/*  Testimonial                                                  */
/* ============================================================ */

function Testimonial() {
  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="text-center"
      >
        <div
          className="text-3xl sm:text-4xl md:text-5xl leading-[1.2] tracking-tight text-balance"
          style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400 }}
        >
          <span className="text-accent-mint">“</span>
          The first time I dragged a window with my hand and felt no latency, I sat back and
          laughed. Aurora isn't a UI — it's the disappearance of one.
          <span className="text-accent-mint">”</span>
        </div>
        <figcaption className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          — A. Lindqvist · Principal Designer, Loops
        </figcaption>
      </motion.figure>
    </section>
  );
}

/* ============================================================ */
/*  Pricing                                                      */
/* ============================================================ */

function Pricing() {
  const tiers = [
    {
      name: "Explorer",
      price: "$0",
      cadence: "free forever",
      tag: null,
      perks: ["Aurora SDK access", "1 spatial workspace", "Community Discord", "Up to 4 windows"],
      cta: "Start exploring",
    },
    {
      name: "Studio",
      price: "$24",
      cadence: "per seat / month",
      tag: "Most popular",
      perks: [
        "Unlimited workspaces",
        "Presence multi-user",
        "Cloud window sync",
        "Priority hardware allocation",
        "99.99% SLA",
      ],
      cta: "Join Studio",
    },
    {
      name: "Enterprise",
      price: "Custom",
      cadence: "billed annually",
      tag: null,
      perks: [
        "Self-host compositor",
        "SAML / SCIM",
        "Dedicated success engineer",
        "On-prem neural fusion",
        "Custom hardware build",
      ],
      cta: "Talk to sales",
    },
  ];
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <SectionLabel>07 · Pricing</SectionLabel>
      <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-2xl">
        Pick your altitude.
      </h2>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {tiers.map((t, i) => {
          const featured = !!t.tag;
          return (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`rounded-3xl p-8 md:p-10 border relative overflow-hidden ${
                featured
                  ? "bg-foreground text-background border-foreground"
                  : "bg-glass border-glass-border"
              }`}
            >
              {featured && (
                <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-accent-mint/20 border border-accent-mint/40 font-mono text-[10px] uppercase tracking-widest text-accent-mint">
                  {t.tag}
                </div>
              )}
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-70 mb-3">
                {t.name}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-5xl font-semibold tracking-tight">{t.price}</div>
              </div>
              <div className="text-sm opacity-60 mb-8">{t.cadence}</div>

              <ul className="space-y-3 mb-10">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className={featured ? "text-background" : "text-accent-mint"}>✓</span>
                    <span className="opacity-90">{p}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`block text-center px-6 py-3.5 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] ${
                  featured ? "bg-background text-foreground" : "bg-foreground text-background"
                }`}
              >
                {t.cta}
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================ */
/*  FAQ                                                          */
/* ============================================================ */

function FAQ() {
  const items = [
    {
      q: "Do I need special hardware to run Aurora?",
      a: "Aurora ships with a software-only simulator that runs on any Apple Silicon or recent x86 machine. For full spatial mode you'll want a compatible headset — we publish a reference list, and ship Aurora Lens in 2027.",
    },
    {
      q: "Is Aurora open source?",
      a: "The SDK and gesture engine are MIT-licensed. The compositor is source-available under a custom commercial license — free for individuals and teams under 10.",
    },
    {
      q: "What about existing apps?",
      a: "Aurora can host any web app, Electron app, or native macOS/Linux window inside a spatial frame. They render at native resolution with our automatic depth-mapping layer.",
    },
    {
      q: "How is my data handled?",
      a: "All gesture and gaze data is processed on-device. Nothing leaves your machine without an explicit per-app permission. We're SOC 2 Type II and GDPR/CCPA compliant.",
    },
    {
      q: "When can I get in?",
      a: "Cohort 01 is invite-only with 142 seats remaining. Request access below and we'll personally reach out within 48 hours.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-4xl mx-auto px-6 md:px-10 pt-32 md:pt-44">
      <SectionLabel>08 · Questions</SectionLabel>
      <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">Frequently asked.</h2>
      <div className="mt-12 divide-y divide-glass-border border-y border-glass-border">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span className="text-lg md:text-xl font-medium group-hover:text-accent-mint transition-colors">
                  {it.q}
                </span>
                <span
                  className={`size-8 rounded-full border border-glass-border flex items-center justify-center text-muted transition-transform ${
                    isOpen ? "rotate-45 text-accent-mint border-accent-mint/40" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 text-muted leading-relaxed">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================ */
/*  CTA                                                          */
/* ============================================================ */

function CTA() {
  const joinFn = useServerFn(joinWaitlist);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed) || trimmed.length > 254) {
      setError("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await joinFn({ data: { email: trimmed, source: "landing_cta" } });
      if (!res.ok) {
        setStatus("idle");
        setError(res.error);
        toast.error(res.error);
        return;
      }
      setStatus("success");
      toast.success(
        res.alreadyJoined ? "You're already on the list." : "You're in. We'll be in touch.",
      );
      setEmail("");
    } catch (err) {
      setStatus("idle");
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      toast.error(msg);
    }
  }

  return (
    <section id="cta" className="max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-56">
      <SectionLabel>09 · Access</SectionLabel>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-8 rounded-4xl md:rounded-[2.5rem] bg-glass border border-glass-border p-10 md:p-20 lg:p-28 text-center relative overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-accent-mint/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 right-0 w-[60%] h-[60%] bg-accent-purple/20 blur-[160px] rounded-full pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-glass border border-glass-border mb-8">
            <span className="size-1.5 rounded-full bg-accent-mint animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Cohort 01 · 142 seats remaining
            </span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-semibold tracking-[-0.04em] leading-[0.92] text-balance">
            Step into the
            <br />
            <span
              style={{ fontFamily: "Instrument Serif", fontStyle: "italic" }}
              className="text-transparent bg-clip-text bg-linear-to-b from-foreground via-accent-mint to-foreground/40"
            >
              spatial era.
            </span>
          </h2>

          <p className="mt-8 md:mt-10 text-lg md:text-xl text-muted max-w-xl mx-auto text-pretty leading-relaxed">
            Aurora is shipping to a small cohort of developers and studios. Reserve your seat —
            we'll reach out personally.
          </p>

          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-12 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <label className="sr-only" htmlFor="waitlist-email">
              Email
            </label>
            <input
              id="waitlist-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              spellCheck={false}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="your@studio.com"
              disabled={status !== "idle"}
              className="flex-1 px-6 py-4 rounded-full bg-background/60 border border-glass-border text-base font-medium placeholder:text-muted/50 focus:outline-none focus:border-accent-mint/60 focus:ring-2 focus:ring-accent-mint/20 transition-all disabled:opacity-50"
              aria-invalid={!!error}
              aria-describedby={error ? "waitlist-error" : undefined}
            />
            <button
              type="submit"
              disabled={status !== "idle"}
              className="px-8 py-4 rounded-full bg-foreground text-background text-base font-bold hover:scale-[1.03] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
            >
              {status === "loading" && (
                <span className="size-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
              )}
              {status === "success"
                ? "Reserved ✓"
                : status === "loading"
                  ? "Reserving"
                  : "Request access"}
            </button>
          </form>

          {error && (
            <p id="waitlist-error" className="mt-4 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}

          <div className="mt-12 pt-8 border-t border-glass-border/50 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            <span className="flex items-center gap-2">
              <svg
                className="size-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              End-to-end encrypted
            </span>
            <span>SOC 2 Type II</span>
            <span>GDPR · CCPA</span>
            <span>No marketing email — ever</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================ */
/*  Footer                                                       */
/* ============================================================ */

function SiteFooter() {
  return (
    <footer id="sdk" className="border-t border-glass-border mt-32 py-16 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="size-3 rounded-full bg-accent-mint shadow-[0_0_14px_rgba(110,255,192,0.7)]" />
            <span className="font-semibold tracking-tight">AURORA OS</span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            Redefining the relationship between human and computer. Built for the spatial era.
          </p>
          <div className="mt-6 flex gap-3">
            {["GH", "X", "DC", "YT"].map((s) => (
              <a
                key={s}
                href="#"
                className="size-9 rounded-full border border-glass-border bg-glass flex items-center justify-center font-mono text-[10px] text-muted hover:text-accent-mint hover:border-accent-mint/40 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          <FooterCol title="Product" links={["Download", "Hardware", "Pricing", "Changelog"]} />
          <FooterCol title="Developers" links={["SDK", "Docs", "GitHub", "Status"]} />
          <FooterCol title="Company" links={["About", "Manifesto", "Press", "Careers"]} />
          <FooterCol title="Connect" links={["Discord", "X / Twitter", "Newsletter"]} />
        </div>
      </div>

      {/* Giant footer wordmark */}
      <div className="max-w-7xl mx-auto mt-20 overflow-hidden">
        <div className="font-semibold text-[20vw] md:text-[16vw] leading-none tracking-[-0.06em] text-transparent bg-clip-text bg-linear-to-b from-foreground/15 to-transparent select-none">
          AURORA
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 pt-8 border-t border-glass-border/50 flex flex-col md:flex-row gap-4 justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
        <span>© 2026 Aurora Labs · All systems nominal</span>
        <span>Stockholm · San Francisco · Tokyo</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{title}</div>
      <div className="flex flex-col gap-2 text-sm">
        {links.map((l) => (
          <a key={l} href="#" className="hover:text-accent-mint transition-colors">
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}

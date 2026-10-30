"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotionPreference as useReducedMotion } from "@/hooks/use-reduced-motion";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { ArrowDown, ArrowUpRight, Flower2, Pause, Play } from "lucide-react";
import { events, hrefFor } from "@/data/content";

/** GSAP owns the editorial scene; Motion owns individual interactive controls. */
export function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    // The rest of the site never downloads GSAP or ScrollTrigger.
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !root.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        const scope = root.current;
        media.add(
          "(prefers-reduced-motion: no-preference)",
          () => {
            const query = gsap.utils.selector(scope);
            const entrance = gsap.timeline({
              defaults: { ease: "power3.out", duration: 0.8 },
            });
            entrance
              .from(
                query(".hero-line-inner"),
                { yPercent: 105, rotate: 2, stagger: 0.1 },
                0,
              )
              .from(
                query(".hero-note"),
                { y: 18, opacity: 0, duration: 0.5 },
                0.25,
              )
              .from(
                query(".botanical-sheet"),
                { rotate: 5, x: 28, scale: 0.94, duration: 1 },
                0.05,
              )
              .from(
                query(".hero-stamp"),
                { scale: 0.8, rotate: -18, opacity: 0, duration: 0.65 },
                0.35,
              )
              .from(
                query(".hero-next"),
                { clipPath: "inset(0 100% 0 0)", duration: 0.65 },
                0.4,
              );
            gsap.to(query(".botanical-drift"), {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: query(".hero-stage")[0],
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });
            gsap.to(query(".hero-ghost"), {
              xPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: query(".hero-stage")[0],
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
            const participation = scope.querySelector(".participation-section");
            if (participation) {
              gsap.fromTo(
                participation.querySelector(".participation-rule"),
                { scaleX: 0 },
                {
                  scaleX: 1,
                  duration: 0.8,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: participation,
                    start: "top 85%",
                    once: true,
                  },
                },
              );
            }
            return () => {
              entrance.kill();
            };
          },
          scope,
        );
        // The stamp rotation is desktop-only; ordinary scrolling is untouched.
        media.add(
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            gsap.to(scope.querySelector(".hero-stamp"), {
              rotate: 15,
              ease: "none",
              scrollTrigger: {
                trigger: scope.querySelector(".hero-stage"),
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            });
          },
          scope,
        );
        document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        cleanup = () => media.revert();
      },
    );
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);
  return (
    <div ref={root} className="home-experience">
      {children}
    </div>
  );
}

function MagneticLink({
  children,
  href,
  className,
}: {
  children: ReactNode;
  href: string;
  className: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22 }),
    springY = useSpring(y, { stiffness: 260, damping: 22 });
  return (
    <motion.div
      className="magnetic-control"
      style={{ x: springX, y: springY }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.055);
        y.set((e.clientY - r.top - r.height / 2) * 0.1);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link className={className} href={href}>
        {children}
      </Link>
    </motion.div>
  );
}

export function HomeHero() {
  const event = events[0];
  return (
    <section className="hero-stage">
      <div className="hero-ghost" aria-hidden="true">
        florecer
      </div>
      <div className="hero wrap">
        <div className="hero-copy">
          <div className="hero-origin">
            <span className="origin-mark" aria-hidden="true" />
            <span>
              Centro de Estudiantes
              <br />
              Instituto Nacional
            </span>
            <span className="hero-edition">
              Un espacio
              <br />
              en común.
            </span>
          </div>
          <h1>
            <span className="hero-line">
              <span className="hero-line-inner">Sembrar voces,</span>
            </span>
            <span className="hero-line hero-line-green">
              <span className="hero-line-inner hero-word">
                florecer cambios.
              </span>
            </span>
          </h1>
          <div className="hero-note">
            <span className="hero-rule" aria-hidden="true" />
            <p className="hero-description">
              Un lugar para encontrarnos,
              <br />
              compartir ideas y darle forma
              <br className="desktop-break" /> a lo que viene.
            </p>
          </div>
          <div className="hero-actions button-row">
            <MagneticLink href="/participa/" className="button hero-primary">
              Hazte escuchar <ArrowUpRight size={21} />
            </MagneticLink>
            <Link href="#ahora" className="text-link">
              Descubre qué pasa <ArrowDown size={18} />
            </Link>
          </div>
          <Link className="hero-next" href={hrefFor(event)}>
            <span className="next-date">
              <strong>12</strong>
              <span>NOV</span>
            </span>
            <span className="next-copy">
              <span>Próximo encuentro · Demo</span>
              <strong>{event.title}</strong>
              <span>{event.time} h · Patio central, lugar de muestra</span>
            </span>
            <ArrowUpRight size={22} />
          </Link>
        </div>
        <div className="hero-art hero-collage">
          <div className="botanical-back-sheet" aria-hidden="true" />
          <div className="botanical-drift">
            <figure className="botanical-sheet">
              <div className="sheet-topline">
                <span>Florecer</span>
                <span>Comunidad estudiantil</span>
              </div>
              <Image
                priority
                src="/images/florecer.jpg"
                width={548}
                height={743}
                sizes="(max-width: 767px) 80vw, 34vw"
                alt="Florecer: una abeja sobre flores blancas y hojas verdes"
              />
              <figcaption>Nuevas ideas. Raíces compartidas.</figcaption>
            </figure>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <span>Crecer en</span>
            <Flower2 size={36} strokeWidth={1.25} />
            <span>comunidad</span>
          </div>
          <span className="collage-caption">Lo que compartimos, crece.</span>
        </div>
        <div className="hero-foot">
          <span>Escuchar es el primer paso.</span>
          <span>
            Desliza y encuentra tu espacio <ArrowDown size={14} />
          </span>
          <span className="hero-demo">Plataforma de demostración</span>
        </div>
      </div>
    </section>
  );
}

export function EditorialMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.1 });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const handle = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);
  const running = visible && !paused && !hidden && !reduced;
  return (
    <div
      ref={ref}
      role="region"
      className="editorial-marquee"
      data-running={running}
      aria-label="Escuchar, proponer, encontrarnos"
    >
      <div className="marquee-viewport">
        <div
          className="marquee-track"
          aria-hidden="true"
          style={{ animationPlayState: running ? "running" : "paused" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div className="marquee-unit" key={i}>
              <span>Escuchar.</span>
              <Flower2 />
              <span>Proponer.</span>
              <Flower2 />
              <span>Encontrarnos.</span>
              <Flower2 />
            </div>
          ))}
        </div>
      </div>
      {!reduced && (
        <button
          className="marquee-pause icon-button"
          aria-label={
            paused ? "Reanudar banda editorial" : "Pausar banda editorial"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      )}
    </div>
  );
}

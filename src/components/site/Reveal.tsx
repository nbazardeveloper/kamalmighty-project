import { useEffect, useRef, useState, type ReactNode } from "react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Fades content into view (opacity only — no transform/translate).
 *
 * - `mode="scroll"` (default) — reveals the first time the element scrolls
 *   into the viewport. Use for sections below the fold.
 * - `mode="mount"` — reveals immediately after mount (e.g. Hero content
 *   that's visible on first paint and should animate in right away).
 *
 * Respects `prefers-reduced-motion` and shows content immediately if
 * IntersectionObserver isn't available.
 *
 * Deliberately opacity-only: an earlier version also slid content up via
 * `translate-y`, but Chrome's Layout Instability API counts that visual
 * movement toward Cumulative Layout Shift (confirmed via a real CLS
 * report — nearly every high-score entry pointed at these
 * `translate-y-0` elements). A pure opacity fade doesn't move the
 * element's rendered box at all, so it can't contribute to CLS.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  mode = "scroll",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "scroll" | "mount";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    if (mode === "mount") {
      // Double rAF so the browser paints the hidden state first, then
      // transitions to visible (a single rAF can still land in the same
      // paint frame and skip the animation).
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mode]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx(
        "transition-opacity duration-700 ease-out",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

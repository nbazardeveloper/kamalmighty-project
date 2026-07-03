import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Shared CTA link — use for every button that points to the same destination
 * (e.g. `#contact`) so they stay visually identical across sections.
 *
 * `tone` describes the surface the button sits on:
 * - "light"    — white/light background (default)
 * - "dark"     — dark background (e.g. photo/dark-overlay sections)
 * - "onAccent" — sits on a brand-yellow surface (e.g. the old Hero widget) —
 *                skips the yellow arrow accent so it doesn't disappear.
 * - "solid"    — always-filled brand-yellow button, for the one primary
 *                action on a page (e.g. Hero's main CTA next to a
 *                secondary "dark" button).
 */
export function CtaButton({
  href,
  children,
  tone = "light",
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark" | "onAccent" | "solid";
  className?: string;
  external?: boolean;
}) {
  const surfaceClasses =
    tone === "dark"
      ? "border-white/40 text-white hover:border-brand-yellow hover:bg-brand-yellow hover:text-brand-charcoal"
      : tone === "solid"
        ? "border-brand-yellow bg-brand-yellow text-brand-charcoal hover:brightness-95"
        : "border-brand-charcoal/40 text-brand-charcoal hover:border-black hover:bg-black hover:text-brand-yellow";

  const skipsYellowAccent = tone === "onAccent" || tone === "solid";
  const accentBoxClasses = skipsYellowAccent ? "bg-brand-charcoal/10" : "bg-brand-yellow/10";
  const accentIconClasses = skipsYellowAccent ? "" : "text-brand-yellow group-hover:text-inherit";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cx(
        "group inline-flex items-stretch border transition-colors",
        surfaceClasses,
        className,
      )}
    >
      <span className="flex-1 px-6 py-4 text-sm font-black uppercase tracking-[0.15em] sm:whitespace-nowrap">
        {children}
      </span>
      <span
        className={cx(
          "flex items-center justify-center border-l border-current px-5",
          accentBoxClasses,
        )}
      >
        <ArrowUpRight
          className={cx(
            "h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            accentIconClasses,
          )}
          strokeWidth={2.5}
        />
      </span>
    </a>
  );
}

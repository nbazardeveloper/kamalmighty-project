import type { ReactNode } from "react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  size = "md",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /**
   * - "center"  — always centered (default; most sections).
   * - "left"    — always left-aligned, at every breakpoint. Use only when
   *               the heading sits above content that's inherently
   *               left-aligned at all sizes too (e.g. a form).
   * - "left-lg" — centered on mobile/tablet, left-aligned from `lg` up.
   *               Use for headings that pair with a side-by-side element
   *               (image, stat grid, badge) that only appears from `lg` —
   *               below that there's nothing to justify sitting off-center,
   *               so it matches the rest of the (centered) section headings.
   */
  align?: "center" | "left" | "left-lg";
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const centered = align === "center";
  const leftLg = align === "left-lg";
  const dark = tone === "dark";

  return (
    <div
      className={cx(
        "mb-14",
        centered && "mx-auto max-w-3xl text-center",
        leftLg && "mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left",
        !centered && !leftLg && "max-w-2xl",
        className,
      )}
    >
      <div
        className={cx(
          "mb-4 flex items-center gap-3",
          centered && "justify-center",
          leftLg && "justify-center lg:justify-start",
        )}
      >
        <span className="h-px w-8 bg-brand-yellow" />
        <span
          className={cx(
            "text-sm font-bold lowercase tracking-[0.25em]",
            dark ? "text-brand-yellow" : "text-neutral-600",
          )}
        >
          {eyebrow}
        </span>
        {(centered || leftLg) && (
          <span className={cx("h-px w-8 bg-brand-yellow", leftLg && "lg:hidden")} />
        )}
      </div>

      <h2
        className={cx(
          "font-display font-black uppercase tracking-tight",
          size === "lg" && "text-5xl sm:text-6xl lg:text-7xl",
          size === "md" && "text-4xl sm:text-5xl lg:text-6xl",
          size === "sm" && "text-3xl sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-black",
        )}
      >
        {title}
      </h2>

      {description && (
        <p className={cx("mt-4 text-lg", dark ? "text-neutral-200" : "text-neutral-700")}>
          {description}
        </p>
      )}
    </div>
  );
}

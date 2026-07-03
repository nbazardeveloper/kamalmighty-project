import type { ElementType, ReactNode } from "react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SIZE_CLASSES = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  stat: "text-4xl sm:text-5xl",
  "stat-lg": "text-7xl sm:text-8xl",
} as const;

const TONE_CLASSES = {
  light: "text-black",
  dark: "text-white",
  accent: "text-brand-yellow",
  charcoal: "text-brand-charcoal",
} as const;

const TRACKING_CLASSES = {
  tight: "tracking-tight",
  normal: "",
  wide: "tracking-wide",
  widest: "tracking-widest",
} as const;

export type HeadingSize = keyof typeof SIZE_CLASSES;
export type HeadingTone = keyof typeof TONE_CLASSES;

/**
 * Shared "card-level" heading — every h3/h4/label-sized bold display-font
 * text on the site (card titles, footer column headings, stat numbers,
 * info labels) should go through this so changing the type scale means
 * editing SIZE_CLASSES here once instead of hunting through every
 * component. For full section titles (the big centered/left headline at
 * the top of a section) use `SectionHeading` instead.
 */
export function Heading({
  as: Tag = "h3",
  size = "md",
  tone = "light",
  uppercase = true,
  tracking = "normal",
  className,
  children,
}: {
  as?: ElementType;
  size?: HeadingSize;
  tone?: HeadingTone;
  uppercase?: boolean;
  tracking?: "tight" | "normal" | "wide" | "widest";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cx(
        "font-display font-black",
        SIZE_CLASSES[size],
        TONE_CLASSES[tone],
        TRACKING_CLASSES[tracking],
        uppercase && "uppercase",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

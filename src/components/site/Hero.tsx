import { Star } from "lucide-react";
import { CtaButton } from "./CtaButton";
import { Reveal } from "./Reveal";

const TRUST_ITEMS = [
  { icon: "/images/icons/Insured.svg", label: "Bonded & Insured" },
  { icon: "/images/icons/Experience.svg", label: "10+ Years of Experience" },
  { icon: "/images/icons/Prices.svg", label: "Fixed Prices on Most Projects" },
  { icon: "/images/icons/hard-hat.svg", label: "Team of 6 Professional Specialists" },
];

export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <picture>
        <source media="(min-width: 640px)" srcSet="/images/hero.webp" />
        <img
          src="/images/heromobile.webp"
          alt="KAM Almighty Property Services headquarters building"
          className="animate-hero-zoom absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Centered headline block */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pt-44 pb-16 text-center sm:px-8 sm:pt-44 lg:px-16 lg:pt-52">
          <Reveal mode="mount" delay={0}>
            <div className="inline-flex items-center gap-3 border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <div className="flex gap-0.5 text-brand-yellow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-yellow" />
                ))}
              </div>
              <span className="text-sm font-bold text-white">
                4.8 <span className="font-medium text-neutral-200">(Reviews on Thumbtack)</span>
              </span>
            </div>
          </Reveal>

          <Reveal mode="mount" delay={150} className="mt-6">
            <h1 className="mx-auto max-w-4xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Built Right.
              <br />
              Priced Fair. Guaranteed.
            </h1>
          </Reveal>

          <Reveal mode="mount" delay={300} className="mt-6">
            <p className="mx-auto max-w-2xl text-lg font-semibold leading-relaxed text-white sm:text-xl">
              10+ years of licensed, bonded &amp; insured craftsmanship across Washington &amp;
              Oregon — fixed pricing, zero hourly surprises.
            </p>
          </Reveal>

          <Reveal
            mode="mount"
            delay={450}
            className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <CtaButton href="#contact" tone="solid" className="w-full sm:w-auto">
              Get a Free Estimate
            </CtaButton>
            <CtaButton href="#services" tone="dark" className="w-full sm:w-auto">
              Our Services
            </CtaButton>
          </Reveal>
        </div>

        {/* Trust bar — pinned to the bottom edge of the hero */}
        <Reveal
          mode="mount"
          delay={600}
          className="grid grid-cols-2 divide-y divide-white/15 border-t border-white/15 sm:grid-cols-4 sm:divide-y-0 sm:divide-x"
        >
          {TRUST_ITEMS.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-4 py-5 text-center sm:flex-row sm:gap-4 sm:px-8 sm:py-8 sm:text-left"
            >
              <img src={icon} alt="" className="h-8 w-8 flex-none sm:h-10 sm:w-10" />
              <span className="text-xs font-semibold uppercase tracking-wide text-white sm:text-base">
                {label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

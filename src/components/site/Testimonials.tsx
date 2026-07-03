import { Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./CtaButton";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

const THUMBTACK_URL =
  "https://www.thumbtack.com/wa/vancouver/handyman/kam-almighty/service/538462661007106057";

const TESTIMONIALS = [
  {
    quote:
      "Kam absolutely blew us away — he showed up at a moment's notice at 10pm after already working a full day to fix my son's e-bike, made the extra upgrades he'd been begging for, and stayed until it was done right. Fast, respectful, and genuinely kind.",
    name: "Chelsea E.",
    date: "Apr 2026",
  },
  {
    quote:
      "Kam is really great with communication and understanding what I need. He helped mount an audio system and reinstall a bath sink — cutting a marble countertop is not an easy job, but he handled it perfectly.",
    name: "Kyle H.",
    date: "Apr 2026",
  },
  {
    quote:
      "Fantastic! Took care of my whole post-move punch list — fixed a lamp, properly installed a heavy curtain rod, new kitchen and bathroom faucets, and a bidet attachment. Civilization, restored.",
    name: "Christine H.",
    date: "Mar 2026",
  },
  {
    quote:
      "Kam came earlier than expected to start the project. IKEA cabinets mounted exactly as instructed, quality of work is great, and communication was excellent. I'll definitely hire him again.",
    name: "Paul M.",
    date: "Jun 2026",
  },
  {
    quote:
      "He removed a large glued-on bathroom mirror, repaired the wall, and textured it to match the rest — small job, but great work and great communication. Thanks!",
    name: "Chris D.",
    date: "Mar 2026",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full overflow-hidden py-24">
      {/* Background stays pinned to the viewport (bg-fixed) while the
          section's content scrolls past it — a classic parallax effect. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/hero-reviews.webp')] bg-cover bg-center bg-fixed"
      />
      <div className="absolute inset-0 bg-brand-charcoal/90" />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16">
        <Reveal className="flex flex-col items-center gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="client reviews."
            title="What Our Clients Say"
            align="left-lg"
            tone="dark"
            className="mb-0"
          />

          <div className="flex flex-none items-center gap-4 border border-white/20 bg-white/5 px-6 py-4">
            <div className="flex gap-0.5 text-brand-yellow">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-yellow" />
              ))}
            </div>
            <div className="text-base font-bold text-white">
              4.8 <span className="text-neutral-300">(Reviews on Thumbtack)</span>
            </div>
          </div>
        </Reveal>

        {/* Mobile: a horizontally-swipeable snap carousel, one card peeking
            the next. From sm up there's room for a real grid, so scrolling
            is turned off and it lays out normally. */}
        <div className="no-scrollbar -mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {TESTIMONIALS.map(({ quote, name, date }, i) => (
            <Reveal
              key={name}
              delay={i * 100}
              className="w-[85%] flex-none snap-start sm:w-auto sm:flex-auto"
            >
              <div className="flex h-full flex-col border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex gap-0.5 text-brand-yellow">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-brand-yellow" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-lg leading-relaxed text-neutral-700">"{quote}"</p>
                <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                  <Heading as="div" size="sm">
                    {name}
                  </Heading>
                  <div className="text-base text-neutral-600">{date}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={TESTIMONIALS.length * 100} className="mt-10">
          <CtaButton href={THUMBTACK_URL} tone="dark" external className="w-full sm:w-auto">
            See All Reviews on Thumbtack
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}

import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./CtaButton";
import { Heading } from "./Heading";

export function WhyUs() {
  return (
    <section id="about" className="relative w-full overflow-hidden py-24">
      {/* Background stays pinned to the viewport (bg-fixed) while the
          section's content scrolls past it — same parallax treatment as
          Testimonials' background. No section-wide wash on top of it: a
          flat overlay over this photo (which is itself a bright, mostly
          white kitchen) made the whole thing read as plain white, as if
          the image weren't there at all. Instead only the text below gets
          its own solid backdrop panel, so the rest of the photo stays
          fully visible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/whykamalmighty.webp')] bg-cover bg-center bg-fixed"
      />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="border border-gray-200 bg-white/90 p-6 sm:p-8 lg:p-10">
            <SectionHeading
              eyebrow="why kam almighty."
              title={
                <>
                  A Dedicated Crew Of <span className="text-brand-yellow">6 Specialists</span> —
                  Moving Fast, Priced Fair.
                </>
              }
              align="left-lg"
              className="mb-6"
            />
            <p className="max-w-xl text-lg leading-relaxed text-neutral-700">
              We don't sub out to strangers. Every job runs through our in-house team, so you get
              consistent quality, prompt scheduling, and honest fixed pricing on most projects —
              with a free on-site assessment before you commit.
            </p>
            <CtaButton href="#contact" className="mt-8 w-full sm:w-auto">
              Book Free Assessment
            </CtaButton>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "10+", l: "Years of experience" },
              { n: "6", l: "In-house specialists" },
              { n: "14", l: "Core services" },
              { n: "100%", l: "Licensed & bonded" },
            ].map((s) => (
              <div
                key={s.l}
                className="border border-gray-200 bg-white p-6 transition-colors hover:border-black"
              >
                <Heading as="div" size="stat" uppercase={false}>
                  {s.n}
                </Heading>
                <div className="mt-2 text-base font-semibold uppercase tracking-wide text-neutral-600">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

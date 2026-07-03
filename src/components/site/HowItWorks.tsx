import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./CtaButton";
import { Heading } from "./Heading";

const STEPS = [
  {
    step: "01",
    title: "Request a Free Estimate",
    description:
      "Tell us about your project online or by phone. We respond within one business day.",
  },
  {
    step: "02",
    title: "On-Site Assessment & Fixed Quote",
    description:
      "A specialist visits your property and provides an honest, fixed price on most projects.",
  },
  {
    step: "03",
    title: "Our In-House Crew Gets to Work",
    description:
      "No subcontractors. The same licensed, bonded & insured team handles start to finish.",
  },
  {
    step: "04",
    title: "Walkthrough & Handover",
    description:
      "We review the finished work together and make sure every detail meets your expectations.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="w-full overflow-hidden bg-white py-24">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-0">
          {/* Left — wider image, no backing */}
          <div className="relative min-h-[440px] overflow-hidden border border-gray-200 lg:col-span-7 lg:min-h-[680px]">
            <img
              src="/images/howitworkshero.webp"
              alt="Finished remodel — living room"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Right — narrower card, overlapping the image; heading now lives inside it */}
          <div className="relative lg:col-span-5 lg:-ml-16 lg:mt-12">
            <div className="border border-gray-200 bg-white p-6 shadow-2xl sm:p-7 lg:p-8">
              <SectionHeading
                eyebrow="how it works."
                title="From First Call To Final Walkthrough"
                description="A simple, transparent process — no surprises, no runaround."
                className="mb-8"
              />

              <ol>
                {STEPS.map(({ step, title, description }, i) => (
                  <li key={step} className="relative flex gap-5">
                    <div className="flex flex-none flex-col items-center">
                      <div className="flex h-12 w-12 flex-none items-center justify-center bg-brand-yellow text-sm font-black text-black">
                        {step}
                      </div>
                      {i !== STEPS.length - 1 && (
                        <span className="w-px flex-1 bg-gray-200" aria-hidden="true" />
                      )}
                    </div>
                    <div className={i !== STEPS.length - 1 ? "pb-8 pt-1.5" : "pt-1.5"}>
                      <Heading size="sm">{title}</Heading>
                      <p className="mt-1.5 text-lg leading-relaxed text-neutral-700">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <CtaButton href="#contact" className="mt-6 w-full">
                Start Your Project
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

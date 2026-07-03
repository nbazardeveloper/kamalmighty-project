import { SectionHeading } from "./SectionHeading";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

const GUARANTEES = [
  {
    icon: "/images/icons/Prices.svg",
    title: "Fixed-Price Guarantee",
    description:
      "Most jobs get a fixed, all-in price after a free on-site assessment — no hourly surprises.",
  },
  {
    icon: "/images/icons/Experience.svg",
    title: "Workmanship Warranty",
    description:
      "Every job is backed by our workmanship warranty, plus manufacturer warranties on materials and fixtures.",
  },
  {
    icon: "/images/icons/Insured.svg",
    title: "Licensed, Bonded & Insured",
    description:
      "Fully licensed, bonded, and insured across Washington and Oregon — proof of coverage available on request.",
  },
];

export function Guarantees() {
  return (
    <section className="w-full bg-white py-24">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <SectionHeading eyebrow="our guarantees." title="What We Promise, We Deliver" />

        <div className="grid gap-6 sm:grid-cols-3">
          {GUARANTEES.map(({ icon, title, description }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="h-full border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-black sm:p-8">
                <img src={icon} alt="" className="h-14 w-14 brightness-0" />
                <Heading size="lg" className="mt-5">
                  {title}
                </Heading>
                <p className="mt-3 text-lg leading-relaxed text-neutral-700">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

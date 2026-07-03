import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { CtaButton } from "./CtaButton";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const SERVICES = [
  {
    icon: "/images/icons/Remodeling.webp",
    number: "01",
    title: "Remodeling",
    description:
      "Full kitchen and bathroom remodels, flooring, painting, and drywall — finished to a licensed standard.",
    items: [
      "Interior remodeling & finishing",
      "Kitchen & bathroom renovations",
      "Laminate, LVP & other flooring installation",
      "Interior & exterior painting",
      "Drywall repair & installation",
      "Wall & ceiling texturing",
    ],
  },
  {
    icon: "/images/icons/Handyman.webp",
    number: "02",
    title: "Handyman",
    description: "Doors, trim, cabinets, and mounting work handled fast by the same in-house crew.",
    items: [
      "Door, baseboard & trim installation",
      "Cabinet & kitchen installation",
      "TV mounting, shelving & fixture installation",
      "General repairs & maintenance — residential & commercial",
    ],
  },
  {
    icon: "/images/icons/MEP Services.webp",
    number: "03",
    title: "MEP Services",
    description:
      "Electrical, plumbing, and fixture work — outlets, faucets, fans, and repairs done right.",
    items: [
      "Electrical work — outlets, switches, lighting, fans & more",
      "Plumbing — faucets, toilets, sinks, disposals, cartridges & more",
    ],
  },
  {
    icon: "/images/icons/ExteriorStructures.webp",
    number: "04",
    title: "Exterior Structures",
    description: "Decks, fences, gates, and outdoor upkeep built to hold up through every season.",
    items: ["Deck building & repair", "Fences & gates"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative w-full overflow-hidden bg-white py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[320px] lg:block xl:w-[420px]"
      >
        <img
          src="/images/services-hero.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-left"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16">
        <SectionHeading eyebrow="our services." title="What We Build" size="lg" className="mb-16" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:pr-56 xl:pr-72">
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={i * 100}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon,
  number,
  title,
  description,
  items,
}: {
  icon: string;
  number: string;
  title: string;
  description: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative h-full border border-gray-200 bg-white p-6 pt-8 transition-colors duration-200 hover:border-black">
      <div className="absolute -top-3.5 left-6 flex h-7 w-7 items-center justify-center bg-gray-100 text-xs font-black text-neutral-500 transition-colors duration-200 group-hover:bg-brand-yellow group-hover:text-black">
        {number}
      </div>

      <img src={icon} alt="" className="h-24 w-24 object-contain" />

      <Heading size="lg" className="mt-5">
        {title}
      </Heading>
      <p className="mt-3 text-lg leading-relaxed text-neutral-700">{description}</p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-neutral-500 transition-colors duration-200 hover:text-black"
      >
        {open ? "Show Less" : "Show More"}
        <ChevronDown
          className={cx(
            "h-3.5 w-3.5 text-brand-yellow transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2.5}
        />
      </button>

      <div
        className={cx(
          "grid transition-all duration-300 ease-out",
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <ul className="overflow-hidden border-t border-gray-200 pt-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 py-1 text-lg text-neutral-700">
              <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-yellow" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <CtaButton href="#contact" className="mt-6 w-full">
        Submit a Request
      </CtaButton>
    </div>
  );
}

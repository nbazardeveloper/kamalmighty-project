import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { Heading } from "./Heading";

const FAQS = [
  {
    q: "How much does a project cost?",
    a: "Most jobs get a fixed, all-in price after a free on-site assessment — no hourly surprises. Larger remodels may be quoted with a detailed line-item estimate so you know exactly what you're paying for.",
  },
  {
    q: "Are you licensed, bonded, and insured?",
    a: "Yes. KAM ALMIGHTY PROPERTY SERVICES LLC is fully licensed, bonded, and insured in Washington and Oregon. Proof of coverage is available on request.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Vancouver, Camas, Battle Ground, Ridgefield, and Washougal in WA, plus Portland, Beaverton, Hillsboro, Tigard, Lake Oswego, Sherwood, Gresham, Happy Valley, and Wilsonville in OR.",
  },
  {
    q: "How long does a typical project take?",
    a: "A single-room remodel usually takes 1–3 weeks; smaller repairs and handyman jobs are often completed same-day or next-day. You'll get a clear timeline before work begins.",
  },
  {
    q: "Do you handle permits?",
    a: "Yes — we pull and manage any required permits as part of the project scope, so you don't have to deal with the city yourself.",
  },
  {
    q: "Is there a warranty on completed work?",
    a: "All work is backed by our workmanship warranty, in addition to manufacturer warranties on any materials or fixtures installed.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative w-full overflow-hidden bg-white py-24">
      {/* Fades from transparent at the very top down to fully opaque —
          the image itself dissolves into the white section above instead
          of cutting off with a hard edge. Separate crop on mobile
          (faqmobile.webp) vs sm+ (faq.webp). */}
      <picture>
        <source media="(min-width: 640px)" srcSet="/images/faq.webp" />
        <img
          src="/images/faqmobile.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom [mask-image:linear-gradient(to_bottom,transparent_0%,black_45%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_45%)]"
        />
      </picture>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="faq." title="Frequently Asked Questions" />

        <div className="border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map(({ q, a }, i) => (
              <AccordionItem key={q} value={`item-${i}`} className="border-gray-200">
                <AccordionTrigger className="py-6 hover:no-underline">
                  <Heading as="span" size="lg" uppercase={false}>
                    {q}
                  </Heading>
                </AccordionTrigger>
                <AccordionContent className="text-lg leading-relaxed text-neutral-700">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

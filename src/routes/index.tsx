import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Projects } from "@/components/site/Projects";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyUs } from "@/components/site/WhyUs";
import { Guarantees } from "@/components/site/Guarantees";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { MobileCta } from "@/components/site/MobileCta";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="w-full overflow-x-hidden pb-16 lg:pb-0">
      <Header />
      <Hero />
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <WhyUs />
      </Reveal>
      <Reveal>
        <Guarantees />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Projects />
      </Reveal>
      {/* Not wrapped in the shared Reveal here — Testimonials reveals its
          own heading, cards, and CTA individually instead, so the parallax
          bg-fixed background behind them is unaffected either way. */}
      <Testimonials />
      <Reveal>
        <FAQ />
      </Reveal>
      <Footer />
      <MobileCta />
    </main>
  );
}

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, ShieldCheck, Mail, Clock, Menu, X } from "lucide-react";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About Us" },
  { href: "#process", label: "How It Works" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contacts" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // The real nav only renders from xl up (see className below) — if the
    // viewport is resized/rotated past that breakpoint while the mobile
    // dropdown is open, close it so it can't get stuck open behind the bar.
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-y border-white/20 shadow-lg shadow-black/20">
      <div className="flex w-full items-stretch">
        {/* Logo badge — spans the full header height, flush left. Smaller
            on mobile: at the h-16 size it used to eat close to half the
            375px viewport, squeezing the email/nav column into a sliver. */}
        <div className="flex flex-none items-center bg-black px-3 py-2 sm:px-8 sm:py-4 lg:py-5">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.webp"
              alt="KAM Almighty Property Services"
              width={872}
              height={368}
              className="h-11 w-auto object-contain sm:h-20 lg:h-24"
            />
          </Link>
        </div>

        <div className="flex flex-1 flex-col">
          {/* Utility strip — always solid, holds contact/trust info */}
          <div className="border-b border-white/15 bg-brand-charcoal/80 text-brand-charcoal-foreground text-sm backdrop-blur-sm sm:text-base">
            <div className="flex w-full items-center justify-between px-3 py-2 sm:px-6 sm:py-2.5 lg:px-10 lg:py-3">
              <a
                href="mailto:help@kamalmighty.com"
                className="flex items-center gap-1.5 hover:text-brand-yellow sm:gap-2"
              >
                <Mail className="h-4 w-4 flex-none text-brand-yellow" />
                <span className="truncate font-medium">help@kamalmighty.com</span>
              </a>
              <div className="hidden items-center gap-4 sm:flex lg:gap-6">
                <div className="flex items-center gap-2 text-neutral-200">
                  <Clock className="h-4 w-4 text-brand-yellow" />
                  <span className="font-medium">Mon – Sat: 7am – 7pm</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-200">
                  <ShieldCheck className="h-4 w-4 text-brand-yellow" />
                  <span className="font-medium">Licensed · Bonded · Insured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main nav — transparent over the Hero photo, only picks up a
              solid dark background once the page has scrolled past it (so
              it stays readable over white sections further down). Below xl
              the link list is replaced by a hamburger toggle that opens the
              dropdown panel underneath (see below). */}
          <div
            className={cx(
              "flex flex-1 items-center px-4 py-5 transition-colors duration-300 sm:px-6 lg:px-10 lg:py-7",
              scrolled || menuOpen ? "bg-brand-charcoal/95 backdrop-blur-sm" : "bg-transparent",
            )}
          >
            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-base font-semibold uppercase tracking-wide text-white hover:text-brand-yellow transition-colors"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
              {/* Icon-only call button on the smallest screens — a full
                  text pill doesn't fit next to the logo + hamburger, and
                  MobileCta's "Call Now" bar already covers this action
                  below xl anyway. From sm up there's enough room for the
                  full pill with the phone number spelled out. */}
              <a
                href="tel:+15648880755"
                aria-label="Call (564) 888-0755"
                className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-brand-yellow text-brand-charcoal shadow-md transition hover:brightness-95 sm:hidden"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="tel:+15648880755"
                className="hidden items-center gap-2 rounded-md bg-brand-yellow px-4 py-3 text-base font-black text-brand-charcoal shadow-md transition hover:brightness-95 sm:inline-flex"
              >
                <Phone className="h-4 w-4" />
                (564) 888-0755
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 flex-none items-center justify-center border border-white/30 text-white xl:hidden"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile nav dropdown — same links as the desktop <nav>, shown
              below xl when toggled open via the hamburger button above. */}
          {menuOpen && (
            <nav id="mobile-nav" className="border-t border-white/10 bg-brand-charcoal xl:hidden">
              <ul className="flex flex-col divide-y divide-white/10">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-6 py-4 text-base font-semibold uppercase tracking-wide text-white hover:bg-white/5 hover:text-brand-yellow"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

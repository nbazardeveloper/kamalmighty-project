import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Heading } from "./Heading";

/**
 * Shared chrome for standalone legal pages (Privacy Policy, Terms of Use).
 * Keeps their header/footer minimal and consistent instead of reusing the
 * full marketing Header/Footer (which carries nav anchors and a lead form
 * that don't make sense on these pages).
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-white/10 bg-brand-charcoal">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-8">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.webp"
              alt="KAM Almighty Property Services"
              width={872}
              height={368}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold uppercase tracking-wide text-neutral-200 hover:text-brand-yellow"
          >
            ← Back to site
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight text-black sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm font-medium text-neutral-600">Last updated: {updated}</p>

        <div className="mt-10 space-y-10 text-lg leading-relaxed text-neutral-700">{children}</div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-neutral-600 sm:px-8">
          © 2026 KAM ALMIGHTY PROPERTY SERVICES LLC · General Contractor
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <Heading as="h2" size="lg" tracking="tight">
        {title}
      </Heading>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

import { Phone, ClipboardList } from "lucide-react";

/**
 * Fixed bottom action bar shown on mobile/tablet (hidden from xl up, which
 * is exactly where Header's full nav takes over — see Header.tsx's
 * `hidden xl:flex`. Keeping both at the same breakpoint avoids a gap where
 * neither the nav nor this bar would be visible.
 */
export function MobileCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-brand-charcoal text-brand-charcoal-foreground xl:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="tel:+15648880755"
        className="flex flex-1 items-center justify-center gap-2 border-r border-white/10 py-3.5 text-sm font-black uppercase tracking-wide"
      >
        <Phone className="h-4 w-4 text-brand-yellow" />
        Call Now
      </a>
      <a
        href="#contact"
        className="flex flex-1 items-center justify-center gap-2 bg-brand-yellow py-3.5 text-sm font-black uppercase tracking-wide text-brand-charcoal"
      >
        <ClipboardList className="h-4 w-4" />
        Get Estimate
      </a>
    </div>
  );
}

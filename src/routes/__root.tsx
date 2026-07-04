import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "@fontsource/archivo/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import appCss from "../styles.css?url";
import { Toaster } from "../components/ui/sonner";

// Preloaded so the two most-used weights (Archivo 900 for every heading,
// Inter 400 for body copy) are fetched immediately instead of after the
// stylesheet parses and requests them. Without this, the fallback-font
// text renders first and reflows once each weight swaps in — with heavy
// text sections like the footer, that shows up as real Cumulative Layout
// Shift (confirmed via a CLS report pointing at font-swap-driven reflow).
import archivoBlackWoff2 from "@fontsource/archivo/files/archivo-latin-900-normal.woff2?url";
import interRegularWoff2 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";

const SITE_TITLE = "KAM ALMIGHTY PROPERTY SERVICES | Licensed General Contractor WA & OR";
const SITE_DESCRIPTION =
  "Licensed, Bonded & Insured general contractor in Vancouver, WA. Residential & commercial remodeling, kitchens, bathrooms, decks, and repairs across WA and OR. Free estimates.";

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "KAM ALMIGHTY PROPERTY SERVICES LLC",
  image: "https://kamalmighty.com/images/logo.webp",
  telephone: "+15648880755",
  email: "help@kamalmighty.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6168 NE Highway 99 Ste 201",
    addressLocality: "Vancouver",
    addressRegion: "WA",
    postalCode: "98665",
    addressCountry: "US",
  },
  openingHours: "Mo-Sa 07:00-19:00",
  areaServed: [
    { "@type": "City", name: "Vancouver, WA" },
    { "@type": "City", name: "Camas, WA" },
    { "@type": "City", name: "Battle Ground, WA" },
    { "@type": "City", name: "Ridgefield, WA" },
    { "@type": "City", name: "Washougal, WA" },
    { "@type": "City", name: "Portland, OR" },
    { "@type": "City", name: "Beaverton, OR" },
    { "@type": "City", name: "Hillsboro, OR" },
    { "@type": "City", name: "Tigard, OR" },
    { "@type": "City", name: "Lake Oswego, OR" },
    { "@type": "City", name: "Sherwood, OR" },
    { "@type": "City", name: "Gresham, OR" },
    { "@type": "City", name: "Happy Valley, OR" },
    { "@type": "City", name: "Wilsonville, OR" },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-black text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-yellow-foreground transition-colors hover:brightness-95"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-yellow-foreground hover:brightness-95"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "KAM ALMIGHTY PROPERTY SERVICES LLC" },
      { name: "theme-color", content: "#111111" },
      { property: "og:site_name", content: "KAM ALMIGHTY PROPERTY SERVICES" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://kamalmighty.com/images/logo.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      {
        name: "twitter:image",
        content: "https://kamalmighty.com/images/logo.webp",
      },
    ],
    links: [
      {
        rel: "preload",
        href: archivoBlackWoff2,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: interRegularWoff2,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCAL_BUSINESS_JSON_LD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

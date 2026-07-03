import { MapPin } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Heading } from "./Heading";

// Hardcoded placeholder set — the live Supabase-backed project gallery
// (see src/lib/projects.functions.ts) needs SUPABASE_URL/SUPABASE_PUBLISHABLE_KEY
// configured as Cloudflare Worker secrets before it can run. Until that's set
// up, show a fixed set of representative projects using existing site photos
// instead of an empty/broken grid.
const PLACEHOLDER_PROJECTS = [
  {
    id: "1",
    title: "Full Kitchen Remodel",
    category: "Remodeling & Renovation",
    description:
      "Complete kitchen overhaul with custom cabinetry, quartz counters, and a redesigned layout for better flow.",
    image_url: "/images/whykamalmighty.webp",
    location: "Vancouver, WA",
  },
  {
    id: "2",
    title: "Primary Bathroom Renovation",
    category: "Remodeling & Renovation",
    description: "Modern tile work, walk-in shower conversion, and updated fixtures throughout.",
    image_url: "/images/hero.webp",
    location: "Camas, WA",
  },
  {
    id: "3",
    title: "Backyard Deck & Patio Build",
    category: "Exterior & Outdoor Structures",
    description: "New composite deck with built-in seating and a covered patio extension.",
    image_url: "/images/howitworkshero.webp",
    location: "Portland, OR",
  },
  {
    id: "4",
    title: "Whole-Home Electrical Upgrade",
    category: "MEP Services (Plumbing & Electrical)",
    description: "Panel replacement, rewiring, and new fixtures across a single-family home.",
    image_url: "/images/services-hero.webp",
    location: "Battle Ground, WA",
  },
  {
    id: "5",
    title: "Exterior Repairs & Siding",
    category: "Handyman & General Repairs",
    description: "Siding repair, fresh trim, and general exterior touch-ups before resale.",
    image_url: "/images/form-hero.webp",
    location: "Beaverton, OR",
  },
  {
    id: "6",
    title: "Basement Finishing",
    category: "Remodeling & Renovation",
    description: "Unfinished basement converted into a livable space with a full bathroom.",
    image_url: "/images/hero-reviews2.webp",
    location: "Ridgefield, WA",
  },
];

function ProjectsGrid() {
  const projects = PLACEHOLDER_PROJECTS;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <article
          key={p.id}
          className="group overflow-hidden rounded-xl border border-border bg-card transition hover:border-brand-yellow hover:shadow-xl"
        >
          <div className="aspect-[4/3] overflow-hidden bg-secondary">
            <img
              src={p.image_url}
              alt={p.title}
              loading="lazy"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-600">
              {p.category}
            </div>
            <Heading size="md" uppercase={false} className="mt-1">
              {p.title}
            </Heading>
            {p.location && (
              <div className="mt-2 flex items-center gap-1.5 text-base text-neutral-600">
                <MapPin className="h-3.5 w-3.5 text-brand-yellow" />
                {p.location}
              </div>
            )}
            {p.description && (
              <p className="mt-3 text-lg text-neutral-700 line-clamp-3">{p.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="bg-background py-24">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <SectionHeading eyebrow="completed work." title="Recent Projects Across WA & OR" />
        <ProjectsGrid />
      </div>
    </section>
  );
}

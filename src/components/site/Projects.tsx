import { MapPin, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SectionHeading } from "./SectionHeading";
import { Heading } from "./Heading";
import { listProjectsPublic } from "@/lib/projects.functions";

function ProjectsGrid() {
  const listFn = useServerFn(listProjectsPublic);
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", "public"],
    queryFn: () => listFn(),
  });

  const projects = data?.projects ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-neutral-400">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading projects…
      </div>
    );
  }

  if (error || projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 py-16 text-center text-neutral-400">
        No projects to show yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <article
          key={p.id}
          className="group overflow-hidden rounded-xl border border-white/15 bg-brand-charcoal transition hover:border-brand-yellow hover:shadow-xl"
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
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              {p.category}
            </div>
            <Heading size="md" tone="dark" uppercase={false} className="mt-1">
              {p.title}
            </Heading>
            {p.location && (
              <div className="mt-2 flex items-center gap-1.5 text-base text-neutral-300">
                <MapPin className="h-3.5 w-3.5 text-brand-yellow" />
                {p.location}
              </div>
            )}
            {p.description && (
              <p className="mt-3 text-lg text-neutral-300 line-clamp-3">{p.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="bg-brand-charcoal py-24">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <SectionHeading
          eyebrow="completed work."
          title="Recent Projects Across WA & OR"
          tone="dark"
        />
        <ProjectsGrid />
      </div>
    </section>
  );
}

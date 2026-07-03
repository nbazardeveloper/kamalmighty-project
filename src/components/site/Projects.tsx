import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { MapPin } from "lucide-react";
import { listProjectsPublic } from "@/lib/projects.functions";
import { SectionHeading } from "./SectionHeading";
import { Heading } from "./Heading";

const projectsQuery = queryOptions({
  queryKey: ["projects", "public"],
  queryFn: () => listProjectsPublic(),
});

function ProjectsGrid() {
  const { data } = useSuspenseQuery(projectsQuery);
  const projects = data.projects;

  if (projects.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-border bg-secondary p-12 text-center">
        <p className="text-lg text-neutral-700">
          Completed projects will appear here as we add them. Check back soon.
        </p>
      </div>
    );
  }

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

function ProjectsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border border-border bg-card"
        >
          <div className="aspect-[4/3] bg-secondary" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-24 rounded bg-secondary" />
            <div className="h-5 w-3/4 rounded bg-secondary" />
            <div className="h-3 w-1/2 rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="bg-background py-24">
      <div className="w-full px-4 sm:px-8 lg:px-16">
        <SectionHeading eyebrow="completed work." title="Recent Projects Across WA & OR" />
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsGrid />
        </Suspense>
      </div>
    </section>
  );
}

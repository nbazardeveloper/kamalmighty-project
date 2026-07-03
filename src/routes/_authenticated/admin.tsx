import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, LogOut, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { listLeads, updateLeadStatus } from "@/lib/leads.functions";
import { listProjectsAdmin, createProject, deleteProject } from "@/lib/projects.functions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SERVICE_CATEGORIES } from "@/lib/validators";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

const STATUSES = ["all", "new", "contacted", "closed"] as const;

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"leads" | "projects">("leads");
  const [filter, setFilter] = useState<(typeof STATUSES)[number]>("all");

  const leadsFn = useServerFn(listLeads);
  const updateStatusFn = useServerFn(updateLeadStatus);

  const leadsQ = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: () => leadsFn(),
  });

  const updateMut = useMutation({
    mutationFn: (v: { id: string; status: "new" | "contacted" | "closed" }) =>
      updateStatusFn({ data: v }),
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["admin", "leads"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Update failed"),
  });

  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const filteredLeads =
    leadsQ.data?.leads.filter((l) => filter === "all" || l.status === filter) ?? [];

  const isForbidden = leadsQ.error && String((leadsQ.error as Error).message).includes("Forbidden");

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-brand-charcoal text-brand-charcoal-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
              KAM Almighty · Admin
            </div>
            <h1 className="font-display text-2xl font-black">Dashboard</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isForbidden ? (
          <div className="rounded-xl border-l-4 border-destructive bg-card p-6">
            <h2 className="font-display text-lg font-black">Not authorized</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your account isn't marked as admin. Sign in with the owner email
              (help@kamalmighty.com) to get admin access automatically.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex gap-2 border-b border-border">
              {(["leads", "projects"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-b-2 transition ${
                    tab === t
                      ? "border-brand-yellow text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "leads" ? (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    {filteredLeads.length} {filter === "all" ? "" : filter} leads
                  </div>
                  <Select value={filter} onValueChange={(v) => setFilter(v as any)}>
                    <SelectTrigger className="w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {leadsQ.isLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading…
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Received</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeads.map((l) => (
                          <TableRow key={l.id}>
                            <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                              {new Date(l.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="font-semibold">{l.name}</TableCell>
                            <TableCell>
                              <a
                                href={`tel:${l.phone}`}
                                className="text-brand-charcoal hover:underline"
                              >
                                {l.phone}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a
                                href={`mailto:${l.email}`}
                                className="text-brand-charcoal hover:underline"
                              >
                                {l.email}
                              </a>
                            </TableCell>
                            <TableCell className="max-w-[220px] truncate">
                              {l.project_description}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={l.status}
                                onValueChange={(v) =>
                                  updateMut.mutate({ id: l.id, status: v as any })
                                }
                              >
                                <SelectTrigger className="w-36">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="contacted">Contacted</SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredLeads.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={6}
                              className="py-8 text-center text-sm text-muted-foreground"
                            >
                              No leads yet.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ) : (
              <ProjectsAdmin />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProjectsAdmin() {
  const qc = useQueryClient();
  const listFn = useServerFn(listProjectsAdmin);
  const createFn = useServerFn(createProject);
  const deleteFn = useServerFn(deleteProject);

  const q = useQuery({ queryKey: ["admin", "projects"], queryFn: () => listFn() });

  const [form, setForm] = useState({
    title: "",
    category: SERVICE_CATEGORIES[0],
    description: "",
    image_url: "",
    location: "",
  });

  const createMut = useMutation({
    mutationFn: () => createFn({ data: form }),
    onSuccess: () => {
      toast.success("Project added");
      setForm({
        title: "",
        category: SERVICE_CATEGORIES[0],
        description: "",
        image_url: "",
        location: "",
      });
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "public"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Failed to add"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Project removed");
      qc.invalidateQueries({ queryKey: ["admin", "projects"] });
      qc.invalidateQueries({ queryKey: ["projects", "public"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Delete failed"),
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-black">Add project</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMut.mutate();
          }}
          className="mt-4 space-y-3"
        >
          <Field label="Title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </Field>
          <Field label="Category">
            <Select
              value={form.category}
              onValueChange={(v) => setForm({ ...form, category: v as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Image URL">
            <Input
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="https://..."
              required
            />
          </Field>
          <Field label="Location">
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Vancouver, WA"
            />
          </Field>
          <Field label="Description">
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </Field>
          <button
            disabled={createMut.isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-yellow px-4 py-3 text-sm font-black uppercase tracking-wide text-brand-charcoal hover:brightness-95 disabled:opacity-70"
          >
            {createMut.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Add project
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-black">Existing projects</h3>
        {q.isLoading ? (
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : (q.data?.projects.length ?? 0) === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No projects yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {q.data!.projects.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <img src={p.image_url} alt="" className="h-14 w-20 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{p.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.category} {p.location && `· ${p.location}`}
                  </div>
                </div>
                <button
                  onClick={() => deleteMut.mutate(p.id)}
                  className="rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-bold uppercase tracking-wide">{label}</Label>
      {children}
    </div>
  );
}

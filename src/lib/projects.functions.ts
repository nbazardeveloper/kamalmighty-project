import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { resolveRealtimeTransport } from "@/integrations/supabase/realtime-transport";
import type { Database } from "@/integrations/supabase/types";
import { projectSchema, type ProjectInput } from "@/lib/validators";
import { getServerEnv } from "@/lib/server-env";
import { z } from "zod";

export const listProjectsPublic = createServerFn({ method: "GET" }).handler(async () => {
  const url = getServerEnv("SUPABASE_URL");
  const key = getServerEnv("SUPABASE_PUBLISHABLE_KEY");
  if (!url || !key) return { projects: [] };
  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    realtime: { transport: resolveRealtimeTransport() },
  });
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,category,description,image_url,location,created_at")
    .order("created_at", { ascending: false })
    .limit(12);
  if (error) {
    console.error("[listProjectsPublic]", error);
    return { projects: [] };
  }
  return { projects: data ?? [] };
});

async function requireAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
}

export const listProjectsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { projects: data ?? [] };
  });

export const createProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: ProjectInput) => projectSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("projects").insert(data);
    if (error) throw error;
    return { ok: true };
  });

const idInput = z.object({ id: z.string().uuid() });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: z.infer<typeof idInput>) => idInput.parse(d))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

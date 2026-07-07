import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { resolveRealtimeTransport } from "@/integrations/supabase/realtime-transport";
import type { Database } from "@/integrations/supabase/types";
import { leadSchema, type LeadInput } from "@/lib/validators";
import { getServerEnv } from "@/lib/server-env";
import { z } from "zod";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: LeadInput) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const url = getServerEnv("SUPABASE_URL");
    const key = getServerEnv("SUPABASE_PUBLISHABLE_KEY");
    if (!url || !key) throw new Error("Supabase env not configured");

    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      realtime: { transport: resolveRealtimeTransport() },
    });

    const { error } = await supabase.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      project_description: data.project_description,
    });
    if (error) {
      console.error("[submitLead] insert failed", error);
      throw new Error("Could not save your request. Please try again or call us.");
    }

    // Fire notifications after successful save; never block the user on them.
    const { sendResendEmail, sendTelegramAlert } = await import(
      "@/lib/notifications.server"
    );
    await Promise.allSettled([
      sendResendEmail(data),
      sendTelegramAlert(data),
    ]);

    return { ok: true };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { data, error } = await context.supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return { leads: data ?? [] };
  });

const statusInput = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "closed"]),
});

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: z.infer<typeof statusInput>) => statusInput.parse(data))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { error } = await context.supabase
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

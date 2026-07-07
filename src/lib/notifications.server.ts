// Server-only notification helpers. Blocked from client bundles by the
// `.server.ts` suffix. All calls are best-effort — failures are logged and
// swallowed so a downed provider never blocks a lead from being saved.
import { getServerEnv } from "@/lib/server-env";

export interface LeadNotification {
  name: string;
  phone: string;
  email: string;
  project_description: string;
}

const FROM_EMAIL = "KAM Almighty <help@kamalmighty.com>";
const TO_EMAIL = "help@kamalmighty.com";

export async function sendResendEmail(lead: LeadNotification): Promise<void> {
  const apiKey = getServerEnv("RESEND_API_KEY");
  if (!apiKey) {
    console.warn("[notifications] RESEND_API_KEY not configured — skipping email");
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: `New Lead: ${lead.name} — ${lead.project_description}`,
        html: renderEmail(lead),
      }),
    });
    if (!res.ok) {
      console.error("[notifications] Resend failed", res.status, await res.text());
    } else {
      console.log("[notifications] Resend email sent to", TO_EMAIL);
    }
  } catch (err) {
    console.error("[notifications] Resend error", err);
  }
}

export async function sendTelegramAlert(lead: LeadNotification): Promise<void> {
  const token = getServerEnv("TELEGRAM_BOT_TOKEN");
  const chatId = getServerEnv("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    console.warn("[notifications] Telegram not configured — skipping alert");
    return;
  }
  const text = [
    "🚧 *New Lead — KAM Almighty*",
    ``,
    `*Name:* ${escapeMd(lead.name)}`,
    `*Phone:* ${escapeMd(lead.phone)}`,
    `*Email:* ${escapeMd(lead.email)}`,
    `*Service:* ${escapeMd(lead.project_description)}`,
  ].join("\n");
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
    if (!res.ok) {
      console.error("[notifications] Telegram failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("[notifications] Telegram error", err);
  }
}

function escapeMd(s: string): string {
  return s.replace(/([_*`\[\]])/g, "\\$1");
}

function renderEmail(lead: LeadNotification): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;background:#f6f6f6;font-weight:700;width:140px;">${label}</td>
      <td style="padding:8px 12px;">${escapeHtml(value)}</td>
    </tr>`;
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:#111111;color:#FFCC00;padding:20px;font-weight:900;font-size:18px;">
        NEW LEAD — KAM ALMIGHTY PROPERTY SERVICES
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#111;">
        ${row("Name", lead.name)}
        ${row("Phone", lead.phone)}
        ${row("Email", lead.email)}
        ${row("Service", lead.project_description)}
      </table>
      <div style="padding:16px;background:#111;color:#fff;font-size:12px;text-align:center;">
        Log in to your admin dashboard to update this lead's status.
      </div>
    </div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

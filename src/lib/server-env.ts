// Reads a server-side secret/env var so it works both locally (Node, via
// process.env / .env file) and when deployed as a Cloudflare Worker.
//
// Why this exists: on Cloudflare Workers, `process.env` is only populated
// from the dashboard "Variables and secrets" when the
// `nodejs_compat_populate_process_env` compatibility flag is active for the
// Worker's compatibility date. That's flaky to depend on (it silently no-ops
// instead of erroring), so we read the actual Worker bindings first.
//
// Nitro's cloudflare-module runtime (see
// node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs)
// sets `globalThis.__env__ = env` on every incoming request, where `env` is
// the real Cloudflare bindings object (Variables and secrets, KV, etc). That
// object always has the values regardless of any compatibility flag, so we
// prefer it and only fall back to `process.env` for local dev / other
// runtimes.
export function getServerEnv(name: string): string | undefined {
  const cfEnv = (globalThis as { __env__?: Record<string, string | undefined> }).__env__;
  const fromCloudflare = cfEnv?.[name];
  if (fromCloudflare !== undefined) return fromCloudflare;
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

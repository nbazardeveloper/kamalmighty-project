// supabase-js always constructs a Realtime client, which eagerly resolves a
// native WebSocket constructor even if Realtime features are never used. In
// SSR (Node/Vite dev server) there may be no global `WebSocket`, which throws
// and crashes rendering/server functions. Pass this as `realtime.transport` to
// any createClient() call to avoid the crash — it only throws if something
// actually tries to open a Realtime connection on the server.
export function resolveRealtimeTransport() {
  if (typeof WebSocket !== "undefined") return undefined;
  return class UnsupportedSSRWebSocket {
    constructor() {
      throw new Error("Supabase Realtime is not available during server-side rendering.");
    }
  } as unknown as typeof WebSocket;
}

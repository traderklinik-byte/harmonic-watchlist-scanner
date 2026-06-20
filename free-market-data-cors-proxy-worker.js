// Cloudflare Worker CORS Proxy untuk HarmonicWatchlistScanner_LiveFreeAPIs.jsx
// Deploy gratis di Cloudflare Workers, lalu masukkan URL Worker ke tab "API & Realtime".
// Format yang dipanggil scanner: https://worker-url.workers.dev?url=https%3A%2F%2F...

const ALLOWED_HOSTS = new Set([
  "query1.finance.yahoo.com",
  "query2.finance.yahoo.com",
  "stooq.com",
  "api.frankfurter.dev",
  "data-api.binance.vision",
  "api.binance.com",
  "api.coingecko.com",
]);

function corsHeaders(extra = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Cache-Control": "no-store",
    ...extra,
  };
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders() });
    }

    const reqUrl = new URL(request.url);
    const targetRaw = reqUrl.searchParams.get("url");
    if (!targetRaw) {
      return new Response("Missing ?url= parameter", { status: 400, headers: corsHeaders() });
    }

    let target;
    try {
      target = new URL(targetRaw);
    } catch {
      return new Response("Invalid target URL", { status: 400, headers: corsHeaders() });
    }

    if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
      return new Response("Target host not allowed", { status: 403, headers: corsHeaders() });
    }

    const upstream = await fetch(target.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json,text/csv,text/plain,*/*",
        "User-Agent": "Mozilla/5.0 HarmonicWatchlistScanner/1.0",
      },
      cf: { cacheTtl: 0, cacheEverything: false },
    });

    const body = await upstream.arrayBuffer();
    const type = upstream.headers.get("content-type") || "text/plain; charset=utf-8";
    return new Response(body, {
      status: upstream.status,
      headers: corsHeaders({ "Content-Type": type }),
    });
  },
};

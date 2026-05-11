import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("slider-state");
  const KEY = "dashboard-sliders";

  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers });
  }

  // GET — read current state
  if (req.method === "GET") {
    try {
      const data = await store.get(KEY);
      if (data) {
        return new Response(data, { status: 200, headers });
      }
      return new Response(JSON.stringify({}), { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({}), { status: 200, headers });
    }
  }

  // POST — save state
  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.set(KEY, JSON.stringify(body));
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  }

  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
};

export const config = {
  path: "/.netlify/functions/slider-state"
};

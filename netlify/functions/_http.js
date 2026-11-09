export function method(event) {
  return event.method || event.httpMethod || "GET";
}

export async function body(event) {
  if (typeof event.body === "string") return JSON.parse(event.body || "{}");
  if (event && typeof event.json === "function") return await event.json();
  return {};
}

export function header(event, name) {
  if (event.headers && typeof event.headers.get === "function") return event.headers.get(name) || "";
  const key = Object.keys(event.headers || {}).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? event.headers[key] : "";
}

export function json(statusCode, data) {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": process.env.SITE_URL || "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    }
  });
}

export function preflight(event) {
  return method(event) === "OPTIONS"
    ? new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": process.env.SITE_URL || "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Methods": "POST, OPTIONS"
        }
      })
    : null;
}

const BACKEND_URL = process.env.BACKEND_API_URL;
const BACKEND_KEY = process.env.BACKEND_API_KEY;

export async function POST(request: Request) {
  if (!BACKEND_URL || !BACKEND_KEY) {
    return new Response(JSON.stringify({ error: "Backend not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let backendResponse: Response;
  try {
    backendResponse = await fetch(`${BACKEND_URL}/api/v2/chat/stream`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BACKEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    return new Response(JSON.stringify({ error: "Could not reach backend" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!backendResponse.ok) {
    const detail = await backendResponse.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: `Backend error ${backendResponse.status}`, detail }),
      { status: backendResponse.status, headers: { "Content-Type": "application/json" } },
    );
  }

  // Pipe the SSE stream back to the client unchanged.
  // The BACKEND_API_KEY never leaves the server.
  return new Response(backendResponse.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      // Disable Nginx/proxy buffering so chunks reach the browser immediately.
      "X-Accel-Buffering": "no",
    },
  });
}

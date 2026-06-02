const BACKEND_URL = process.env.BACKEND_API_URL;
const BACKEND_KEY = process.env.BACKEND_API_KEY;

export async function DELETE(_request: Request, context: { params: Promise<{ chatId: string }> }) {
  if (!BACKEND_URL || !BACKEND_KEY) {
    return new Response(JSON.stringify({ error: "Backend not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { chatId } = await context.params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/v2/chat/${chatId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${BACKEND_KEY}` },
    });
    return new Response(null, { status: res.status });
  } catch {
    return new Response(JSON.stringify({ error: "Could not reach backend" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}

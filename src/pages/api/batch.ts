import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.TCG_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'TCG_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let ids: string[];
  try {
    const body = await request.json();
    ids = body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(JSON.stringify({ error: 'ids must be a non-empty array' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const upstream = new URL('https://api.tcgpricelookup.com/v1/cards/search');
  for (const id of ids.slice(0, 20)) upstream.searchParams.append('ids', id);

  try {
    const res = await fetch(upstream.toString(), {
      headers: {
        'X-API-Key': apiKey,
        'Accept': 'application/json',
      },
    });

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Upstream request failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

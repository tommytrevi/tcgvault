import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.TCG_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'TCG_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch('https://api.tcgpricelookup.com/v1/games', {
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

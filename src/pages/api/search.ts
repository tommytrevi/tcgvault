import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const apiKey = import.meta.env.TCG_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'TCG_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const q = url.searchParams.get('q') || '';
  const game = url.searchParams.get('game');
  const limit = url.searchParams.get('limit') || '20';
  const offset = url.searchParams.get('offset') || '0';

  const upstream = new URL('https://api.tcgpricelookup.com/v1/cards/search');
  if (q) upstream.searchParams.set('q', q);
  if (game) upstream.searchParams.set('game', game);
  upstream.searchParams.set('limit', limit);
  upstream.searchParams.set('offset', offset);

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

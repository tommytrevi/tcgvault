import type { APIRoute } from 'astro';
import { TcgLookupClient } from '@tcgpricelookup/sdk';

export const GET: APIRoute = async ({ url }) => {
  const apiKey = import.meta.env.TCG_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'TCG_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = new TcgLookupClient({ apiKey });
  const q = url.searchParams.get('q') || '';
  const game = url.searchParams.get('game') || undefined;

  try {
    const results = await client.cards.search({ q, game: game as any, limit: 20 });
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

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

  const id = url.searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = new TcgLookupClient({ apiKey });

  try {
    const results = await client.cards.search({ ids: [id] });
    const card = results.data[0] ?? null;
    if (!card) {
      return new Response(JSON.stringify({ error: 'Card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(card), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

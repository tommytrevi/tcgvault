import type { APIRoute } from 'astro';
import { TcgLookupClient } from '@tcgpricelookup/sdk';

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

  const client = new TcgLookupClient({ apiKey });

  try {
    const results = await client.cards.search({ ids });
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

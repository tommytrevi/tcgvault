import { TcgLookupClient } from '@tcgpricelookup/sdk';
import { getApiKey } from './storage';

let _client: TcgLookupClient | null = null;

export function getClient(): TcgLookupClient {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('No API key configured. Please set your API key first.');
  }
  // Re-create client if needed (e.g., key changed)
  if (!_client) {
    _client = new TcgLookupClient({ apiKey });
  }
  return _client;
}

export function createClient(apiKey: string): TcgLookupClient {
  _client = new TcgLookupClient({ apiKey });
  return _client;
}

export function resetClient(): void {
  _client = null;
}

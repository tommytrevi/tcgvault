import type { CollectionItem } from './types';

const KEYS = {
  COLLECTION: 'tcgvault:collection',
  WISHLIST: 'tcgvault:wishlist',
} as const;

// --- Collection ---

export function getCollection(): CollectionItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.COLLECTION);
    if (!raw) return [];
    return JSON.parse(raw) as CollectionItem[];
  } catch {
    return [];
  }
}

export function saveCollection(items: CollectionItem[]): void {
  localStorage.setItem(KEYS.COLLECTION, JSON.stringify(items));
}

export function addToCollection(item: CollectionItem): CollectionItem[] {
  const collection = getCollection();
  // Check for existing entry with same id + condition
  const existingIndex = collection.findIndex(
    (c) => c.id === item.id && c.condition === item.condition
  );
  if (existingIndex >= 0) {
    collection[existingIndex]!.quantity += item.quantity;
    saveCollection(collection);
    return collection;
  }
  const updated = [...collection, item];
  saveCollection(updated);
  return updated;
}

export function updateCollectionItem(
  id: string,
  condition: string,
  updates: Partial<CollectionItem>
): CollectionItem[] {
  const collection = getCollection();
  const updated = collection.map((item) => {
    if (item.id === id && item.condition === condition) {
      return { ...item, ...updates };
    }
    return item;
  });
  saveCollection(updated);
  return updated;
}

export function removeFromCollection(id: string, condition: string): CollectionItem[] {
  const collection = getCollection();
  const updated = collection.filter(
    (item) => !(item.id === id && item.condition === condition)
  );
  saveCollection(updated);
  return updated;
}

export function clearCollection(): void {
  localStorage.removeItem(KEYS.COLLECTION);
}

// --- Export ---

export function exportCollectionAsJSON(collection: CollectionItem[]): void {
  const json = JSON.stringify({ version: '0.1', exportedAt: new Date().toISOString(), collection }, null, 2);
  downloadFile(json, 'tcgvault-collection.json', 'application/json');
}

export function exportCollectionAsCSV(collection: CollectionItem[]): void {
  const headers = ['Name', 'Game', 'Set', 'Number', 'Condition', 'Quantity', 'Cached Price (NM)', 'Added At'];
  const rows = collection.map((item) => [
    csvEscape(item.name),
    csvEscape(item.game),
    csvEscape(item.set),
    csvEscape(item.number),
    csvEscape(item.condition),
    String(item.quantity),
    item.cachedPrice != null ? item.cachedPrice.toFixed(2) : '',
    item.addedAt,
  ]);
  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadFile(csv, 'tcgvault-collection.csv', 'text/csv');
}

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

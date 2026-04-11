import { useState, useEffect, useCallback } from 'react';
import { getCollection, saveCollection } from '../../lib/storage';
import type { CollectionItem, AppView } from '../../lib/types';
import SearchBar from './SearchBar';
import CardSearchResults from './CardSearchResults';
import CollectionList from './CollectionList';
import ExportMenu from './ExportMenu';
import EmptyState from './EmptyState';
import type { GameSlug } from '@tcgpricelookup/sdk';
import GameFilter from './GameFilter';
import Settings from './Settings';

export default function App() {
  const [view, setView] = useState<AppView>('search');
  const [query, setQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameSlug | ''>('');
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCollection(getCollection());
  }, []);

  const handleCollectionChange = useCallback((updated: CollectionItem[]) => {
    setCollection(updated);
    saveCollection(updated);
  }, []);

  if (!mounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-mono)' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
      {/* App nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-border)',
        paddingTop: '1.5rem',
        paddingBottom: '0',
        marginBottom: '1.5rem',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: '0', borderBottom: 'none' }}>
          {([
            { id: 'search', label: 'Search' },
            { id: 'collection', label: `Collection (${collection.length})` },
            { id: 'settings', label: 'Settings' },
          ] as { id: AppView; label: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              style={{
                padding: '10px 18px',
                background: 'none',
                border: 'none',
                borderBottom: view === tab.id ? '2px solid var(--color-accent)' : '2px solid transparent',
                color: view === tab.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-family-sans)',
                fontSize: '0.9rem',
                fontWeight: view === tab.id ? 600 : 400,
                cursor: 'pointer',
                transition: 'color 0.15s',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {view === 'collection' && collection.length > 0 && (
          <ExportMenu collection={collection} />
        )}
      </div>

      {/* Views */}
      {view === 'search' && (
        <div>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <SearchBar query={query} onQueryChange={setQuery} />
            <GameFilter selectedGame={selectedGame} onGameChange={setSelectedGame} />
          </div>
          <CardSearchResults
            query={query}
            game={selectedGame || undefined}
            collection={collection}
            onCollectionChange={handleCollectionChange}
          />
        </div>
      )}

      {view === 'collection' && (
        collection.length === 0 ? (
          <EmptyState onGoSearch={() => setView('search')} />
        ) : (
          <CollectionList
            collection={collection}
            onCollectionChange={handleCollectionChange}
          />
        )
      )}

      {view === 'settings' && (
        <Settings onCollectionCleared={() => handleCollectionChange([])} />
      )}
    </div>
  );
}

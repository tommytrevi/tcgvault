import { useState, useEffect, useRef } from 'react';
import type { Card, GameSlug } from '@tcgpricelookup/sdk';
import { getClient } from '../../lib/client';
import { addToCollection } from '../../lib/storage';
import type { CollectionItem, Condition } from '../../lib/types';
import { CONDITION_LABELS, CONDITIONS } from '../../lib/types';
import CardDetail from './CardDetail';

interface Props {
  query: string;
  game?: GameSlug;
  collection: CollectionItem[];
  onCollectionChange: (items: CollectionItem[]) => void;
}

export default function CardSearchResults({ query, game, collection, onCollectionChange }: Props) {
  const [results, setResults] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [addingCard, setAddingCard] = useState<string | null>(null);
  const [addCondition, setAddCondition] = useState<Condition>('near_mint');
  const [addSuccess, setAddSuccess] = useState<string | null>(null);
  const [detailCard, setDetailCard] = useState<Card | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query || query.trim().length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const client = getClient();
        const response = await client.cards.search({
          q: query.trim(),
          game: game || undefined,
          limit: 20,
        });
        setResults(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed. Please try again.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, game]);

  const handleAddCard = (card: Card) => {
    const nmPrice = card.prices.raw['near_mint']?.tcgplayer?.market ?? undefined;
    const item: CollectionItem = {
      id: card.id,
      name: card.name,
      game: card.game.slug,
      set: card.set.name,
      setCode: card.set.slug,
      number: card.number ?? '',
      quantity: 1,
      condition: addCondition,
      addedAt: new Date().toISOString(),
      cachedPrice: nmPrice ?? undefined,
      imageUrl: card.image_url ?? undefined,
    };
    const updated = addToCollection(item);
    onCollectionChange(updated);
    setAddSuccess(card.id);
    setAddingCard(null);
    setTimeout(() => setAddSuccess(null), 2000);
  };

  const getCardNmPrice = (card: Card): number | null => {
    return card.prices.raw['near_mint']?.tcgplayer?.market ?? null;
  };

  const isInCollection = (cardId: string) =>
    collection.some(c => c.id === cardId);

  if (!query || query.trim().length < 2) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--color-text-muted)',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto', display: 'block', opacity: 0.4 }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <p style={{ fontFamily: 'var(--font-family-mono)', fontSize: '0.9rem' }}>
          Type at least 2 characters to search cards
        </p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Searching across{' '}
          <a href="https://tcgpricelookup.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
            300,000+ cards
          </a>
          {' '}via TCG Price Lookup API
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-mono)', fontSize: '0.9rem' }}>
        Searching...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        backgroundColor: 'rgba(255, 68, 68, 0.1)',
        border: '1px solid rgba(255, 68, 68, 0.3)',
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        color: '#ff6b6b',
        fontSize: '0.875rem',
      }}>
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-mono)', fontSize: '0.9rem' }}>
        No cards found for "{query}"
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-family-mono)' }}>
        {results.length} results for "{query}"
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {results.map(card => {
          const nmPrice = getCardNmPrice(card);
          const inCollection = isInCollection(card.id);
          const isAdding = addingCard === card.id;
          const justAdded = addSuccess === card.id;

          return (
            <div
              key={card.id}
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: `1px solid ${inCollection ? 'rgba(0,255,136,0.3)' : 'var(--color-border)'}`,
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}
            >
              {/* Card image */}
              {card.image_url && (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => setDetailCard(card)}
                >
                  <img
                    src={card.image_url}
                    alt={card.name}
                    style={{ width: '100%', aspectRatio: '2/2.8', objectFit: 'contain', backgroundColor: '#111', display: 'block' }}
                    loading="lazy"
                  />
                </div>
              )}

              <div style={{ padding: '0.875rem' }}>
                {/* Card info */}
                <button
                  onClick={() => setDetailCard(card)}
                  style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', width: '100%' }}
                >
                  <div style={{
                    color: 'var(--color-text-heading)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    marginBottom: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {card.name}
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                    {card.set.name} {card.number ? `· #${card.number}` : ''}
                  </div>
                </button>

                {/* Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-mono)' }}>NM </span>
                    <span style={{
                      fontFamily: 'var(--font-family-mono)',
                      fontWeight: 600,
                      color: nmPrice != null ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      fontSize: '0.95rem',
                    }}>
                      {nmPrice != null ? `$${nmPrice.toFixed(2)}` : 'N/A'}
                    </span>
                  </div>
                  {inCollection && !justAdded && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontFamily: 'var(--font-family-mono)' }}>in collection</span>
                  )}
                  {justAdded && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontFamily: 'var(--font-family-mono)' }}>added!</span>
                  )}
                </div>

                {/* Add controls */}
                {isAdding ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <select
                      value={addCondition}
                      onChange={(e) => setAddCondition(e.target.value as Condition)}
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        color: 'var(--color-text)',
                        fontSize: '0.8rem',
                        outline: 'none',
                        fontFamily: 'var(--font-family-sans)',
                      }}
                    >
                      {CONDITIONS.map(c => (
                        <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleAddCard(card)}
                        style={{
                          flex: 1,
                          backgroundColor: 'var(--color-accent)',
                          color: '#000',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAddingCard(null)}
                        style={{
                          backgroundColor: 'transparent',
                          color: 'var(--color-text-muted)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          padding: '6px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingCard(card.id)}
                    style={{
                      width: '100%',
                      backgroundColor: justAdded ? 'rgba(0,255,136,0.15)' : 'transparent',
                      color: justAdded ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      border: `1px solid ${justAdded ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      borderRadius: '6px',
                      padding: '7px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      fontFamily: 'var(--font-family-sans)',
                    }}
                    onMouseOver={(e) => {
                      if (!justAdded) {
                        e.currentTarget.style.borderColor = 'var(--color-accent)';
                        e.currentTarget.style.color = 'var(--color-accent)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!justAdded) {
                        e.currentTarget.style.borderColor = 'var(--color-border)';
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                      }
                    }}
                  >
                    {justAdded ? '✓ Added' : '+ Add to Collection'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card detail modal */}
      {detailCard && (
        <CardDetail card={detailCard} onClose={() => setDetailCard(null)} />
      )}
    </>
  );
}
